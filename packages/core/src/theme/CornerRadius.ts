export const UNSTABLE_CornerRadiusValues = ["none", "rounded"] as const;

export type UNSTABLE_CornerRadius =
  (typeof UNSTABLE_CornerRadiusValues)[number];
