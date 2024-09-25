'use server'

import { verifySession } from "@/lib/dal";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function generateSession(token:string,phone:string) {
  console.log(phone)
  await createSession(token,phone)
}

export async function logout() {
  deleteSession()
  redirect('/')
}

export async function _verifysession() {
  return  await verifySession()
} 

