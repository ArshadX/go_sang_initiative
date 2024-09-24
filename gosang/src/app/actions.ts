'use server'

import { createSession } from "@/lib/session";

export async function generateSession(token:string) {
  await createSession(token)
}