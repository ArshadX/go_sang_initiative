'use server'

import { verifySession } from "@/lib/dal";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function generateSession(token:string,phone_number:string) {
  await createSession(token,phone_number)
}

export async function logout() {
  const res = await deleteSession()
  return res
}

export const getCredentials = cache(async() => {
  const session = await verifySession()
  return session
})

