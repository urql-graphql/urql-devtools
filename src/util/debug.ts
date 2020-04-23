export const debug =
  process.env.NODE_ENV !== "production" ? console.log : () => undefined;
