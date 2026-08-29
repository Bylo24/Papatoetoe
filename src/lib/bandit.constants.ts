export const experimentId = "request-cta-copy" as const;

export const banditVariants = [
  "control",
  "urgent",
  "local",
  "fast",
  "quote",
] as const;

export type BanditVariant = (typeof banditVariants)[number];
