import React, { useEffect, useState } from 'react'

import TableHeader from "@/app/TableHeader"
import RootLayout from "@/app/layout"
import withAuth from '@/auth/withAuth'
import { useAuth } from '@/auth/AuthContext'
import { useRouter } from 'next/router'

const EditIssuerPage = () => {

    const { api } = useAuth()
    const router = useRouter()

    const [issuer, setIssuer] = useState(null)

    const [idState, setIdState] = useState("")
    const [nameState, setNameState] = useState("")
    const [binsState, setBinsState] = useState("")

    const [successState, setSuccessState] = useState(null)
    const [errorState, setErrorState] = useState(null)

    useEffect(() => {
        setIssuer(null)
        const { id: issuerId } = router.query
        setIdState(issuerId)

        if (issuerId) {
            api.getIssuer(issuerId)
            .then(data => {        
                setIssuer(data.issuer)
                setNameState(data.issuer.name)
                setBinsState(data.issuer.bins?.join(","))
            })
            .catch(err => {
                if (err.name == "RightPayAPIError") {
                    setErrorState("Error getting issuer: " + err.message)
                }
            })
        }
    }, [router.query.id])

    function saveIssuer() {
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

        api.updateIssuer(idState, nameState, bins)
        .then(() => {
            setErrorState(null)
            router.push("/issuers")
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
                title="Edit Issuer"
                subtitle="Global issuers issue credit cards, not to be confused with payment networks (e.g. Visa or Mastercard)."
                buttonTitle="Back" 
                buttonURL="/issuers"
                buttonType="light" />

            {successState ? <div className="alert alert-success mt-3" role="alert">{successState}</div> : <></>}
            {errorState ? <div className="alert alert-danger mt-3" role="alert">{errorState}</div> : <></>}
            <div className="mt-3">
                <form onSubmit={e => {
                    e.preventDefault()
                    saveIssuer()
                }}>
                    <div className="mb-3">
                        <label for="name" className="form-label">ID</label>
                        <input type="text" className="form-control" id="id"
                            value={idState} required disabled/>
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"
                            value={nameState}
                            onChange={e => setNameState(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" for="bins">BINs</label>
                        <textarea id="bins" className="form-control"
                            style={{fontFamily: "monospace"}} spellcheck="false"
                            value={binsState}
                            onChange={e => setBinsState(e.target.value)}></textarea>
                        <div className="form-text">Provide a comma separated set of 6-digit BIN numbers.</div>
                    </div>
                    <div className="d-flex">
                        <button type="submit" className="btn btn-primary" disabled={issuer == null}>Save</button>
                        {/* <button type="submit" className="btn btn-danger ms-1" disabled={issuer == null} onClick={e => {
                            e.preventDefault()
                            const del = confirm(`Delete issuer "${issuer.name}"?`)
                        }}>Delete</button> */}
                    </div>
                    
                </form>
            </div>
        </RootLayout>
    )
}
export default withAuth(EditIssuerPage)
