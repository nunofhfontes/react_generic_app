import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Head from 'next/head';
import '../styles/globals.css'
import AddUser from '../components/Users/AddUser';


export default function App() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    // on initial load - do an auth check 
    authCheck();
    
    // on route change start - hide page content by setting authenticated to false     
    router.events.on('routeChangeStart', authCheck);

    // on route change complete - do an auth check 
    router.events.on('routeChangeComplete', authCheck)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      // router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', authCheck);
    }

  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    console.log("checking auth....");
}


  return (
    <div className="bg-black h-screen font-sans flex items-center w-full bg-teal-lighter justify-center">
      <AddUser />
    </div>
  )
}


