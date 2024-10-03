import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { cache } from 'react'

 
export const verifySession = async () => {
  const cookie =  cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.token) {
   return { isAuth: false, token: null,phone_number:null }
  }
 
  return { isAuth: true, token: session?.token,phone_number:session.phone_number }
}