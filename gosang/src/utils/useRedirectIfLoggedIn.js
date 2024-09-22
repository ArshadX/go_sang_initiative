import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Custom hook to handle redirection or check login status
const useRedirectIfLoggedIn = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);

      if (props === '') {
        router.push('/profile');  // Redirect to the profile or dashboard page
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [props, router]);

  // Return the login status if checking
  return props != '' ? isLoggedIn : null;
};

export default useRedirectIfLoggedIn;
