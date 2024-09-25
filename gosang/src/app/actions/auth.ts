'use server'

import { verifySession } from "@/lib/dal";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function generateSession(token:string,phone_number:string) {
  await createSession(token,phone_number)
}

export async function logout() {
  deleteSession()
  redirect('/')
}

export async function _verifysession() {
  return  await verifySession()
} 

