import cookie from 'js-cookie';

export const setCookies = (cookies) => {
    for (const [key, value] of Object.entries(cookies)) {
        cookie.set(`${key}`, value)
    }
}

export const setTokens = (tokens) => {
    cookie.set('accessToken', tokens.accessToken);
    cookie.set('refreshToken', tokens.refreshToken)
}

export const getTokens = () => {
    return {
        accessToken: cookie.get('accessToken'),
        refreshToken: cookie.get('refreshToken')
    }
}