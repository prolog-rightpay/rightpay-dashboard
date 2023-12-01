import RightPayAPI from '@/api/RightPayAPI'
import { createContext, useContext, useEffect, useState } from 'react'
import { getSessionTokenCookie, setSessionTokenCookie } from './cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [sessionToken, setSessionToken] = useState(getSessionTokenCookie)
    const api = new RightPayAPI(sessionToken)

    useEffect(() => {
        api.setSessionToken(sessionToken)
        setSessionTokenCookie(sessionToken)
    }, [sessionToken])

    return (
        <AuthContext.Provider value={{ api, sessionToken, setSessionToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
