import pkg from "../../../../package.json";

export const dynamic = "force-dynamic";

export function GET() {
  const envStatus = {
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
  };

  const allConfigured = Object.values(envStatus).every(Boolean);

  return Response.json({
    status: allConfigured ? "healthy" : "degraded",
    version: pkg.version,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "unknown",
    env: envStatus,
  });
}
