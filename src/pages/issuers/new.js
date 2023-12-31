import React, { useState } from 'react'

import TableHeader from "@/app/TableHeader"
import RootLayout from "@/app/layout"
import withAuth from '@/auth/withAuth'
import { useAuth } from '@/auth/AuthContext'

const NewIssuerPage = () => {

    const { api } = useAuth()

    const [nameState, setNameState] = useState("")
    const [binsState, setBinsState] = useState("")

    const [successState, setSuccessState] = useState(null)
    const [errorState, setErrorState] = useState(null)

    function newIssuer() {
        if (nameState.length <= 0) {
            setErrorState("Must provide a name.")
            return
        }
        let bins = []
        if (binsState.length > 0) {
            bins = binsState.split(",").map(str => {
                return /^[0-9]{6}$/.test(str) ? str : null
            })
            console.log(bins)
            if (bins.includes(null)) {
                setErrorState("Invalid BINs, provide a comma separated set of 6-digit numbers.")
                return
            }
        }

        api.newIssuer(nameState, bins)
        .then(() => {
            setErrorState(null)
            setSuccessState("Created new issuer.")

            setNameState("")
            setBinsState("")
        })
        .catch(err => {
            setSuccessState(null)
            if (err.name == "RightPayAPIError") {
                setErrorState(err.message)
            } else {
                console.log(err)
                setErrorState("An unknown error occurred.")
            }
        })
    }

    return (
        <RootLayout currentPage="issuers">
            <TableHeader
                title="New Card Issuer"
                subtitle="Subtitle"
                buttonTitle="Back" 
                buttonURL="/issuers"
                buttonType="light" />

            {successState ? <div className="alert alert-success mt-3" role="alert">{successState}</div> : <></>}
            {errorState ? <div className="alert alert-danger mt-3" role="alert">{errorState}</div> : <></>}
            <div className="mt-3">
                <form onSubmit={e => {
                    e.preventDefault()
                    newIssuer()
                }}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"
                            value={nameState}
                            onChange={e => setNameState(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" for="bins">BINs</label>
                        <textarea id="bins" className="form-control"
                            style={{fontFamily: "monospace"}} spellcheck="false"
                            value={binsState}
                            onChange={e => setBinsState(e.target.value)}></textarea>
                        <div className="form-text">Provide a comma separated set of 6-digit BIN numbers.</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </RootLayout>
    )
}
export default withAuth(NewIssuerPage)
