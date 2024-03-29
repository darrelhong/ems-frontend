import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useCheckToken({ redirectTo = '/' }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      router.push({ pathname: redirectTo, query: { info: 'noToken' } });
    } else {
      setIsLoggedIn(true);
    }
  }, [token, setIsLoggedIn, router, redirectTo]);

  return [isLoggedIn];
}
