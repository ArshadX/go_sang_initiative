// components/NavbarScrollHandler.js (Client Component)
'use client'; // Enable client-side rendering for this component

import { useState, useEffect, ReactNode } from 'react';

const NavbarScrollHandler = ({children}:{children:ReactNode}) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${isFixed ? 'fixed shadow-md top-0 left-0 right-0' : 'relative'} w-full bg-white`}>
      {children}
    </div>
  );
};

export default NavbarScrollHandler;
