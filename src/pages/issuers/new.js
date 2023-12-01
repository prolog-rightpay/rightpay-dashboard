import React, { useState } from 'react'

import TableHeader from "@/app/TableHeader"
import RootLayout from "@/app/layout"
import withAuth from '@/auth/withAuth'

const NewIssuerPage = () => {

    const [nameState, setNameState] = useState("")
    const [binsState, setBinsState] = useState("")

    return (
        <RootLayout currentPage="issuers">
            <TableHeader
                title="New Card Issuer"
                subtitle="Subtitle"
                buttonTitle="Back" 
                buttonURL="/issuers"
                buttonType="light" />
            <div className="mt-3">
                <form onSubmit={e => {
                    console.log(e)
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
