'use client'
import { _verifysession, logout } from "@/app/actions/auth"
import ButtonMedium from "@/components/common/Button"

export function Logout() {
    const _session  = _verifysession()
    async function _logout(e:React.FormEvent<Element>){
        e.preventDefault()
       await logout()
      }
    console.log(_session)
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