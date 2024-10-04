import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { cache } from 'react'

 
export const verifySession = cache(async () => {
  const cookiestore =  cookies().get('authentication')?.value
  const session = await decrypt(cookiestore)
 
  if (!session.phone_number) {
   return { isAuth: false, token: null,phone_number:null }
  }
 
  return { isAuth: true, token: session?.token,phone_number:session.phone_number }
})