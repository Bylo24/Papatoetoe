import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBanditDashboard } from "@/lib/bandit.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Dashboard = Awaited<ReturnType<typeof getBanditDashboard>>;

function AdminPage() {
  const [password, setPassword] = useState("");
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await getBanditDashboard({ data: { password } });
      setDashboard(result);
    } catch {
      setDashboard(null);
      setError("That password was not accepted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:py-16">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="text-sm font-semibold text-primary underline underline-offset-4"
        >
          Back to website
        </a>
        <div className="mt-8 flex items-start justify-between gap-5 border-b border-border pb-7">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent-foreground">
              <ShieldCheck className="size-4" /> Private analytics
            </p>
            <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
              Bandit results
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Live performance for the request CTA experiment. Traffic gradually
              favors the variant with the strongest conversion rate.
            </p>
          </div>
          {dashboard && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => void loadDashboard()}
              title="Refresh results"
              aria-label="Refresh results"
            >
              <RefreshCw className="size-4" />
            </Button>
          )}
        </div>

        {!dashboard ? (
          <form
            onSubmit={loadDashboard}
            className="mt-10 max-w-md rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <LockKeyhole className="size-7 text-primary" />
            <h2 className="mt-5 text-2xl font-bold uppercase">Admin access</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the server-side admin password to view results.
            </p>
            <div className="mt-6 grid gap-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="mt-3 text-sm font-semibold text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              <LockKeyhole /> {loading ? "Checking…" : "View results"}
            </Button>
          </form>
        ) : (
          <DashboardView dashboard={dashboard} />
        )}
      </div>
    </main>
  );
}

function DashboardView({ dashboard }: { dashboard: Dashboard }) {
  const winner = dashboard.variants.reduce<
    Dashboard["variants"][number] | undefined
  >(
    (best, variant) =>
      !best || variant.conversionRate > best.conversionRate ? variant : best,
    undefined,
  );

  return (
    <section className="mt-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric
          label="Total impressions"
          value={dashboard.totalImpressions.toLocaleString()}
        />
        <Metric
          label="Total conversions"
          value={dashboard.variants
            .reduce((total, variant) => total + variant.conversions, 0)
            .toLocaleString()}
        />
        <Metric label="Current leader" value={winner?.name ?? "-"} />
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <BarChart3 className="size-5 text-primary" />
          <div>
            <h2 className="font-bold uppercase">Request CTA copy</h2>
            <p className="text-sm text-muted-foreground">
              Experiment: {dashboard.experimentId}
            </p>
          </div>
        </div>
        <div className="grid gap-0 md:grid-cols-2">
          {dashboard.variants.map((variant) => (
            <article
              key={variant.name}
              className="border-b border-border p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold uppercase">{variant.name}</h3>
                {variant.name === winner?.name && (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase">
                    Leading
                  </span>
                )}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Stat
                  label="Impressions"
                  value={variant.impressions.toLocaleString()}
                />
                <Stat
                  label="Conversions"
                  value={variant.conversions.toLocaleString()}
                />
                <Stat
                  label="Conversion rate"
                  value={`${(variant.conversionRate * 100).toFixed(2)}%`}
                />
                <Stat
                  label="Traffic share"
                  value={`${(variant.trafficShare * 100).toFixed(1)}%`}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl font-bold uppercase">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
