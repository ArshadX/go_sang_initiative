import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import ButtonMedium from './Button'
import { redirect } from 'next/navigation'

export default function Dialogue() {
  let [isOpen, setIsOpen] = useState(true)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(true)
  }
  function handleLogin (e:FormEvent<Element>) {
    e.preventDefault()
    redirect('/')
  }
  return (
      <Dialog open={isOpen} as="div" className="absolute focus:outline-none top-1/3" onClose={close}>
        <div className="inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-primary/20 shadow-lg p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Login to proceed!
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-gray-800">
                You are not logged in. Please login to proceed furthur
              </p>
              <div className="mt-4">
                <a
                type='button'
                 // className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                className="inline-flex items-center gap-2 rounded-md bg-secondary py-1.5 px-3 text-sm/6 font-semibold text-ternary shadow-inner shadow-white/10 focus:outline-none hover:bg-cyan-400 open:bg-cyan-400 data-[focus]:outline-1 data-[focus]:outline-white"
                href='/login'
                >
                  Login
                </a>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  )
}
