/** GET /api/v1/health — liveness check for deploys and uptime monitors. */
export function GET() {
  return Response.json({ status: "ok", service: "kirshify-web", time: new Date().toISOString() });
}
