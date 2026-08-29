import { Redis } from "@upstash/redis";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  banditVariants,
  experimentId,
  type BanditVariant,
} from "./bandit.constants";

type VariantStats = {
  impressions: number;
  conversions: number;
};

type ExperimentStats = Record<BanditVariant, VariantStats>;

const memoryStore = new Map<string, unknown>();

function getRedis() {
  if (
    process.env["UPSTASH_REDIS_REST_URL"] &&
    process.env["UPSTASH_REDIS_REST_TOKEN"]
  ) {
    return Redis.fromEnv();
  }
  return null;
}

async function getValue<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (redis) return redis.get<T>(key);
  return (memoryStore.get(key) as T | undefined) ?? null;
}

async function setValue(key: string, value: unknown) {
  const redis = getRedis();
  if (redis) {
    await redis.set(key, value);
    return;
  }
  memoryStore.set(key, value);
}

function emptyStats(): ExperimentStats {
  return {
    control: { impressions: 0, conversions: 0 },
    urgent: { impressions: 0, conversions: 0 },
    local: { impressions: 0, conversions: 0 },
    fast: { impressions: 0, conversions: 0 },
    quote: { impressions: 0, conversions: 0 },
  };
}

function normalizeStats(
  stats: Partial<ExperimentStats> | null,
): ExperimentStats {
  const defaults = emptyStats();
  return banditVariants.reduce((result, variant) => {
    result[variant] = stats?.[variant] ?? defaults[variant];
    return result;
  }, defaults);
}

function chooseVariant(stats: ExperimentStats): BanditVariant {
  const totalImpressions = banditVariants.reduce(
    (total, variant) => total + stats[variant].impressions,
    0,
  );
  const unexplored = banditVariants.find(
    (variant) => stats[variant].impressions === 0,
  );
  if (unexplored) return unexplored;

  const epsilon = Math.max(0.1, 1 / Math.sqrt(Math.max(totalImpressions, 1)));
  if (Math.random() < epsilon) {
    return (
      banditVariants[Math.floor(Math.random() * banditVariants.length)] ??
      "control"
    );
  }

  return banditVariants.reduce((best, variant) => {
    const bestRate = stats[best].conversions / stats[best].impressions;
    const variantRate = stats[variant].conversions / stats[variant].impressions;
    return variantRate > bestRate ? variant : best;
  }, banditVariants[0]);
}

const visitorInput = z.object({
  visitorId: z.string().min(16).max(100),
});

export const getBanditAssignment = createServerFn({ method: "POST" })
  .validator((input) => visitorInput.parse(input))
  .handler(async ({ data }) => {
    const assignmentKey = `bandit:${experimentId}:visitor:${data.visitorId}`;
    const existing = await getValue<BanditVariant>(assignmentKey);
    if (existing && banditVariants.includes(existing)) {
      return { experimentId, variant: existing };
    }

    const statsKey = `bandit:${experimentId}:stats`;
    const stats = normalizeStats(await getValue<ExperimentStats>(statsKey));
    const variant = chooseVariant(stats);
    stats[variant].impressions += 1;
    await setValue(statsKey, stats);
    await setValue(assignmentKey, variant);
    return { experimentId, variant };
  });

export const recordBanditConversion = createServerFn({ method: "POST" })
  .validator((input) =>
    visitorInput.extend({ experimentId: z.literal(experimentId) }).parse(input),
  )
  .handler(async ({ data }) => {
    const assignmentKey = `bandit:${experimentId}:visitor:${data.visitorId}`;
    const variant = await getValue<BanditVariant>(assignmentKey);
    if (!variant || !banditVariants.includes(variant)) return { recorded: false };
    if (await getValue<boolean>(`${assignmentKey}:converted`)) {
      return { recorded: false };
    }

    const statsKey = `bandit:${experimentId}:stats`;
    const stats = normalizeStats(await getValue<ExperimentStats>(statsKey));
    stats[variant].conversions += 1;
    await setValue(statsKey, stats);
    await setValue(`${assignmentKey}:converted`, true);
    return { recorded: true };
  });

const dashboardInput = z.object({ password: z.string().min(1).max(200) });

export const getBanditDashboard = createServerFn({ method: "POST" })
  .validator((input) => dashboardInput.parse(input))
  .handler(async ({ data }) => {
    const expectedPassword =
      process.env["BANDIT_ADMIN_PASSWORD"] ?? "apples321";
    if (!expectedPassword || data.password !== expectedPassword) {
      throw new Error("Invalid admin password");
    }

    const normalizedStats = normalizeStats(
      await getValue<ExperimentStats>(`bandit:${experimentId}:stats`),
    );
    const totalImpressions = banditVariants.reduce(
      (total, variant) => total + normalizedStats[variant].impressions,
      0,
    );
    return {
      experimentId,
      variants: banditVariants.map((variant) => ({
        name: variant,
        ...normalizedStats[variant],
        conversionRate:
          normalizedStats[variant].impressions > 0
            ? normalizedStats[variant].conversions /
              normalizedStats[variant].impressions
            : 0,
        trafficShare:
          totalImpressions > 0
            ? normalizedStats[variant].impressions / totalImpressions
            : 0,
      })),
      totalImpressions,
    };
  });

export { banditVariants, experimentId };
export type { BanditVariant };
