export type AuthBoundary = {
  mode: "public" | "protected";
  enabled: boolean;
};

export const publicAuthBoundary: AuthBoundary = {
  mode: "public",
  enabled: false,
};