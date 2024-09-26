import { Button } from '@headlessui/react'

export default function ButtonMedium ({onClick,type,children,primary}:{onClick?:(e:React.FormEvent)=>void,children:any,type?:"submit" | "reset" | "button" | undefined,primary?:boolean | true}){
    return (
        <Button
        onClick={onClick}
        type={type}
        className={`inline-flex items-center gap-2 rounded-md ${primary?'bg-primary data-[hover]:bg-pink-500 data-[open]:bg-pink-600':'bg-secondary data-[hover]:bg-cyan-400 data-[open]:bg-cyan-400' } py-1.5 px-3 text-sm/6 font-semibold ${primary?'text-white':'text-ternary' } shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white`}
        >
        {children}
      </Button>
    )
}