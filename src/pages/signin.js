import React, { useState } from 'react'
import { useRouter } from 'next/router'

import NoAuthLayout from "@/app/NoAuthLayout"
import { useAuth } from '@/auth/AuthContext'

const SignInPage = () => {

    const [errorState, setErrorState] = useState(null)
    const [emailState, setEmailState] = useState("")
    const [passwordState, setPasswordState] = useState("")

    const router = useRouter()

    const { api, sessionToken, setSessionToken } = useAuth()

    function handleSubmit(e) {
        e.preventDefault()
        setErrorState(null)
        api.signin(emailState, passwordState)
        .then(() => {
            setSessionToken(api.sessionToken)
            router.push("/")
        })
        .catch(err => {
            if (err.name == "RightPayAPIError") {
                setErrorState(err.message)
            } else {
                console.log(err)
                setErrorState("Unknown error occured.")
            }
        })
    }

    return (
        <NoAuthLayout>
            <div className="mt-3">
                <div class="alert alert-danger" role="alert"
                    style={{display: errorState ? "block" : "none"}}>{errorState}</div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email"
                            value={emailState}
                            onChange={e => setEmailState(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                            value={passwordState}
                            onChange={e => setPasswordState(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </NoAuthLayout>
    )
}
export default SignInPage
