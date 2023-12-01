import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSessionTokenCookie } from './cookie'
import { useAuth } from './AuthContext'

const withAuth = WrappedComponent => {
    const Auth = props => {
        const router = useRouter()
        const { _, sessionToken } = useAuth()

        useEffect(() => {
            const sessionToken = getSessionTokenCookie()
            if (!sessionToken) {
                router.push("/signin")
            }
        }, [])

        return <WrappedComponent {...props} />
    }
    return Auth
}

export default withAuth
