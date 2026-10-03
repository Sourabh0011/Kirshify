import "server-only";

import { z } from "zod";

/** Consistent JSON envelope for every /api/v1 route: `{ data }` or `{ error }`. */
export function ok<T>(data: T, init?: ResponseInit) {
  return Response.json({ data }, init);
}

export function fail(status: number, message: string, details?: unknown) {
  return Response.json({ error: { message, details } }, { status });
}

export function validationError(error: z.ZodError) {
  return fail(422, "Validation failed", z.flattenError(error).fieldErrors);
}

export function searchParamsToObject(params: URLSearchParams): Record<string, string> {
  return Object.fromEntries(params.entries());
}
