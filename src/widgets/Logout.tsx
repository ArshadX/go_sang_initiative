'use client'
import { logout } from "@/app/actions/auth"
import ButtonMedium from "@/components/common/Button"
import { useRouter } from "next/navigation"

export function Logout() {
    const router = useRouter()
     async function _logout(e:React.FormEvent<Element>){

        e.preventDefault()
        try {
            const res  = await logout()
            router.push('/');
        }catch(e){
            console.log("not deleted cookies",e)
        }
      
 
      }
    return (
    <ButtonMedium
        onClick={_logout}
    >
        Logout
    </ButtonMedium>
    )
}