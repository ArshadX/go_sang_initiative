import { Children } from "react";

export default function Button ({onClick,type,children}:{onClick?:(e:React.FormEvent)=>void,children:any,type?:"submit" | "reset" | "button" | undefined}){
    return (
        <button
        onClick={onClick}
        type={type}
        className="rounded-md bg-sky-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        {children}
      </button>
    )
}