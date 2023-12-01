import Cookies from 'js-cookie'

const cookieName = "session-token"

export const setSessionTokenCookie = sessionToken => {
    const secureFlag = process.env.NODE_ENV === "production" ? { secure: true } : {}
    Cookies.set(cookieName, sessionToken, {
        ...secureFlag
    })
}

export const getSessionTokenCookie = () => {
    return Cookies.get(cookieName)
}

export const removeSessionTokenCookie = () => {
    Cookies.remove(cookieName)
}
