import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTokens } from '~/helpers/cookie';

export const RouteGuard = ({ children }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        authCheck(router.pathname);
        const hideContent = () => setAuthorized(false);
        const showContent = () => setAuthorized(true);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', showContent);
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', showContent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(pathname) {
        let tokens = getTokens();
        if(pathname !== "/account/register") {
            if ( !tokens.accessToken || !tokens.refreshToken ) {
                router.push({ pathname: '/account/login' })
            }
            else {
                router.push({ pathname: '/' })
            }
        }
        else {
            setAuthorized(true);
        }
    }
    return (authorized && children);
}