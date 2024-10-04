import Login from "@/components/login/Login"
import { verifySession } from "@/lib/dal"

export default async function Page (){
  return(
    <>
    <Login />
    </>
  )
}
