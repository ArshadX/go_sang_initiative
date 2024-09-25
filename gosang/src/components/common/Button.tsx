import { Children } from "react";

export default function Button ({onClick,type,children}:{onClick?:(e:React.FormEvent)=>void,children:any,type?:"submit" | "reset" | "button" | undefined}){
    return (
        <button
        onClick={onClick}
        type={type}
        className="text-sm font-semibold leading-6 text-ternary bg-primary active:bg-pink-200 bg- px-3 py-2 rounded-2xl"
        >
        {children}
      </button>
    )
}