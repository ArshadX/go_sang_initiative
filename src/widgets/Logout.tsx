'use client'
import { logout } from "@/app/actions/auth"
import ButtonMedium from "@/components/common/Button"

export function Logout() {
     function _logout(e:React.FormEvent<Element>){

        e.preventDefault()
        try {
            const res  = logout()
            console.log("cookies from web",res)
        }catch(e){
            console.log("not deleted cookies",e)
        }
      
 
      }
    return (
    <ButtonMedium
        onClick={_logout}
       // className="text-sm font-semibold leading-6 text-ternary bg-primary px-3 py-2 rounded-2xl"
    >
        Logout 
        {/* <span aria-hidden="true">&rarr;</span> */}
    </ButtonMedium>
    )
}