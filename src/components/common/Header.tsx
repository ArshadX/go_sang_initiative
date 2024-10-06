import React from 'react';
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import Image from 'next/image';
import { RiArrowDownSLine, RiChat4Line, RiCustomerServiceLine, RiMoneyRupeeCircleLine, RiPhoneLine, RiShieldCheckLine, RiTeamLine } from 'react-icons/ri';
import { Logout } from '@/widgets/Logout';
import { getCredentials } from '@/app/actions/auth';

const about = [
  { name: 'Who we are', description: '', href: '/about', icon: RiTeamLine },
  { name: 'Refer and earn free rides', description: '', href: '#', icon: RiMoneyRupeeCircleLine },
  { name: 'Safety measures', description: '', href: '#', icon: RiShieldCheckLine },
  { name: 'FAQs', description: '', href: '#', icon: RiChat4Line},
];

const callsToAction = [
  { name: 'Contacts', href: '#', icon: RiPhoneLine },
  { name: 'Complain', href: '#', icon: RiCustomerServiceLine },
];

export default async function Header() {
  const session = await getCredentials()
  console.log("credentials in header",session);

  // Optionally handle the case where isLoggedIn is undefined (e.g., during the hook's execution)
  return (
    <header className="bg-white py-2">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Gosang</span>
            <Image
              src='/images/logo/logo.png'
              alt="company logo"
              width={112}
              height={33}
              priority
              style={{ objectFit: 'contain' }}
              className='bg-black'
            />
          </a>
        </div>

        <PopoverGroup className="hidden md:flex md:gap-x-12">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Add Ride
          </a>
          <a href="/myrides" className="text-sm font-semibold leading-6 text-gray-900">
            My Rides
          </a>       
          <a href="/profile" className="text-sm font-semibold leading-6 text-gray-900">
            Profile
          </a>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              About
              <RiArrowDownSLine aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {about.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        </PopoverGroup>
        <div className="flex lg:flex-1 lg:justify-end">
             <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-pink-600 open:bg-pink-600 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              {`${session.isAuth},${session.token}`}
              {/* <span aria-hidden="true">&rarr;</span> */}
            </a>
          {!session?.isAuth ? (
            <div className='space-x-6'>
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-md bg-primary py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-pink-600 open:bg-pink-600 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Register 
              {/* <span aria-hidden="true">&rarr;</span> */}
            </a>
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-md bg-secondary py-1.5 px-3 text-sm/6 font-semibold text-ternary shadow-inner shadow-white/10 focus:outline-none hover:bg-cyan-400 open:bg-cyan-400 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Log in 
              {/* <span aria-hidden="true">&rarr;</span> */}
            </a>
            </div>
          ):
          <div className='space-x-6'>
            <Logout />
          </div>
          }

        </div>
      </nav>
    </header>
  );
}
