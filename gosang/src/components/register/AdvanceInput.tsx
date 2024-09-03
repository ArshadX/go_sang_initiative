export default function AdvanceInput({onChange}:{onChange?:(e:React.FormEvent<HTMLInputElement>)=>void}){
    return (
 
        <label htmlFor="fname"><input type="text" id="fname" name="fname"  className="rounded-3xl py-2 px-4   w-full m-1 text-lg bg-gray-200 focus:outline focus:outline-offset-0 focus:outline-3 focus:outline-cyan-400" onChange={onChange} /></label>

    )
}