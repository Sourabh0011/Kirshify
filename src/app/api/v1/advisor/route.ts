import type { NextRequest } from "next/server";
import { z } from "zod";

import { fail, ok, validationError } from "@/server/http";
import { getAdvisorReply } from "@/server/services/advisor.service";

const askSchema = z.object({ message: z.string().trim().min(1).max(500) });

/** POST /api/v1/advisor — `{ message }` → `{ reply, language, source }` */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return fail(400, "Request body must be JSON");

  const parsed = askSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  return ok(await getAdvisorReply(parsed.data.message));
}
