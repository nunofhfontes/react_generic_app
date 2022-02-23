import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { userService } from '../services/user.service';

import '../styles/globals.css'
import AddUser from '../components/Users/AddUser';


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    console.log("Doing auth check");

    // on initial load - do an auth check 
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    
    // on route change start - hide page content by setting authenticated to false     
    router.events.on('routeChangeStart', authCheck);

    // on route change complete - do an auth check 
    router.events.on('routeChangeComplete', authCheck)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      // router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

  }, []);

  const authCheck = (url) => {
    // redirect to login page if accessing a private page and not logged in 
    console.log("checking auth....");

    //TODO - is a render neeeded?
    // setUser(userService.userValue);

    const publicPaths = ['/login', '/register'];
    // remove query parameters 
    const urlPath = url.split('?')[0];
    
    if(!userService.userValue && !publicPaths.includes(urlPath)) {
      setAuthenticated(false);
      console.log("setting Auth to false");
      router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath }
      });
    } else {
      console.log("setting Auth to true");
      setAuthenticated(true);
    }

  }

  // <AddUser />
  return (
    <div className=" h-screen font-sans flex items-center w-full bg-teal-lighter justify-center">
      <title>Next.js 11 - User Registration and Login Example</title>
      {authenticated &&
        <Component {...pageProps} />
      }
    </div>
  )
}


