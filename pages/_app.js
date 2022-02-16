import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { userService } from '../services/user.service';

import '../styles/globals.css'
import AddUser from '../components/Users/AddUser';


export default function App() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    // on initial load - do an auth check 
    authCheck(router.asPath);
    
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
        router.push({
            pathname: '/login',
            query: { returnUrl: router.asPath }
        });
    } else {
      setAuthenticated(false);
    }

  }

  // <AddUser />
  return (
    <div className="bg-black h-screen font-sans flex items-center w-full bg-teal-lighter justify-center">

      {authenticated &&
        <Component {...pageProps} />
      }
    </div>
  )
}


