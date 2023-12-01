import React, { useState } from 'react'

import TableHeader from "@/app/TableHeader"
import RootLayout from "@/app/layout"

const issuersData = [
    {
        name: "American Express",
        id: "aaa"
    },
    {
        name: "Chase",
        id: "bbb"
    },
    {
        name: "Bank of America",
        id: "ccc"
    }
]

const NewPaymentMethodPage = () => {

    const [globalIssuersState, setGlobalIssuersState] = useState(issuersData)

    const [nameState, setNameState] = useState("")
    const [issuerState, setIssuerState] = useState("")
    const [paymentTypeState, setPaymentTypeState] = useState("")
    const [networkTypeState, setNetworkTypeState] = useState("")

    return (
        <RootLayout currentPage="payment_methods">
            <TableHeader
                title="New Payment Method"
                subtitle="Subtitle"
                buttonTitle="Back" 
                buttonURL="/paymentmethods"
                buttonType="light" />
            <div className="mt-3">
                <form>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"
                            value={nameState}
                            onChange={e => setNameState(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="issuer" className="form-label">Issuer</label>
                        <div>
                            <select name="issuer" id="issuer" className="form-select"
                                value={issuerState}
                                onChange={e => setIssuerState(e.target.value)} >
                                <option value="">Select issuer</option>
                                {globalIssuersState.map(issuer => (
                                    <option key={issuer.id} value={issuer.id}>{issuer.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-text">New issuers can be created on the <a href="/issuers/new">New Global Issuer</a> page.</div>
                    </div>
                    <div className="mb-3">
                        <label for="payment-type" className="form-label">Payment Type</label>
                        <div>
                            <select name="payment-type" id="payment-type" className="form-select"
                                value={paymentTypeState}
                                onChange={e => setPaymentTypeState(e.target.value)} >
                                <option value="credit" selected>Credit</option>
                                <option value="debit">Debit</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="network-type" className="form-label">Network Type</label>
                        <div>
                            <select name="network-type" id="network-type" className="form-select"
                                value={networkTypeState}
                                onChange={e => setNetworkTypeState(e.target.value)} >
                                <option value="">Select network type</option>
                                <option value="visa">Visa</option>
                                <option value="mastercard">Mastercard</option>
                                <option value="american_express">American Express</option>
                                <option value="discover">Discover</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </RootLayout>
    )
}
export default NewPaymentMethodPage
