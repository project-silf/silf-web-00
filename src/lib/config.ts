function requiredEnv(name: "NEXT_PUBLIC_APP_NAME") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  appName: requiredEnv("NEXT_PUBLIC_APP_NAME"),
} as const;
