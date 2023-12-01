import React, { useState } from 'react'

import TableHeader from "@/app/TableHeader"
import RootLayout from "@/app/layout"
import MultiSelect from "@/app/MultiSelect"

const paymentMethods = [
    {
        name: "One",
        id: "aaa"
    },
    {
        name: "Two",
        id: "bbb"
    }
]

const NewPromotionPage = () => {

    const [globalPaymentMethodsState, setGlobalPaymentMethodsState] = useState(paymentMethods)
    const [globalBusinessCategoriesState, setGlobalBusinessCategoriesState] = useState(["one", "two", "three"])

    const [paymentMethodsState, setPaymentMethodsState] = useState([])
    const [cashbackTypeState, setCashbackTypeState] = useState([])
    const [cashbackPercentageState, setCashbackPercentageState] = useState(0)
    const [cashbackReimbursementState, setCashbackReimbursementState] = useState(0)
    const [spendingMinState, setSpendingMinState] = useState(null)
    const [spendingMaxState, setSpendingMaxState] = useState(null)
    const [spendingCycleState, setSpendingCycleState] = useState(null)
    const [isRequiresEnrollmentState, setIsRequiresEnrollmentState] = useState(false)
    
    // included businesses
    const [isOnlyIncludedBusinessesState, setIsOnlyIncludedBusinessesState] = useState(false)
    const [selectedIncludedCategoryState, setSelectedIncludedCategoryState] = useState("")
    const [includedCategoriesState, setIncludedCategoriesState] = useState([])
    const [includedBusinessesState, setIncludedBusinessesState] = useState([])
    const [includedBusinessInputState, setIncludedBusinessInputState] = useState("")

    // excluded businesses
    const [isOnlyExcludedBusinessesState, setIsOnlyExcludedBusinessesState] = useState(false)
    const [selectedExcludedCategoryState, setSelectedExcludedCategoryState] = useState("")
    const [excludedCategoriesState, setExcludedCategoriesState] = useState([])
    const [excludedBusinessesState, setExcludedBusinessesState] = useState([])
    const [excludedBusinessInputState, setExcludedBusinessInputState] = useState([])

    const [isTimePeriodState, setIsTimePeriodState] = useState(false)
    const [timePeriodStartState, setTimePeriodStartState] = useState(false)
    const [timePeriodEndState, setTimePeriodEndState] = useState(false)

    const [isIntroductoryState, setIsIntroductoryState] = useState(false)
    const [introductoryLengthState, setIntroductoryLengthState] = useState(null)

    function addCategoryInclusion(item) {
        if (!includedCategoriesState.includes(item)) {
            setIncludedCategoriesState([...includedCategoriesState, item])
        }
    }

    function addBusinessInclusion() {
        const business = includedBusinessInputState.toLowerCase()
        if (business.length > 0) {
            if (!includedBusinessesState.includes(business)) {
                setIncludedBusinessesState([...includedBusinessesState, business])
            }
        }
        setIncludedBusinessInputState("")
    }

    function addCategoryExclusion(item) {
        if (!excludedCategoriesState.includes(item)) {
            setExcludedCategoriesState([...excludedCategoriesState, item])
        }
    }

    function addBusinessExclusion() {
        const business = excludedBusinessInputState.toLowerCase()
        if (business.length > 0) {
            if (!excludedBusinessesState.includes(business)) {
                setExcludedBusinessesState([...excludedBusinessesState, business])
            }
        }
        setExcludedBusinessInputState("")
    }

    return (
        <RootLayout currentPage="issuers">
            <TableHeader
                title="New Cashback Promotion"
                subtitle="Subtitle"
                buttonTitle="Back" 
                buttonURL="/promotions"
                buttonType="light" />
            <div className="mt-3">
                <form id="form">
                    <div className="mb-3">
                        <label className="form-label" for="payment-method">Payment Method</label>
                        <div>
                            <select
                                id="payment-method"
                                className="form-select"
                                value={paymentMethodsState}
                                onChange={e => setPaymentMethodsState(e.target.value)} required>
                                <option value="">Select payment method</option>
                                {globalPaymentMethodsState.map(paymentMethod => (
                                    <option key={paymentMethod.id} value={paymentMethod.id}>{paymentMethod.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-text">Payment method that contains the promotion, new ones can be added on the <a href="/paymentmethods/new">New Payment Method</a> page.</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label" for="cashback-type">Cashback Type</label>
                        <div>
                            <select
                                id="cashback-type"
                                className="form-select"
                                value={cashbackTypeState}
                                onChange={e => setCashbackTypeState(e.target.value)}>
                                <option value="percentage">Percentage</option>
                                <option value="reimbursement">Reimbursement</option>
                            </select>
                        </div>
                        <div className="form-text">Percentage is <i>x%</i> back on purchases. Reimbursement is a cashback cash sum on minimum spend reached.</div>
                    </div>

                    <div className="mb-3"
                        style={{display: cashbackTypeState == "percentage" ? "block" : "none"}}>
                        <label for="cashback-percentage" className="form-label">Cashback Percentage %</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cashback-percentage" step="1"
                            value={cashbackPercentageState}
                            onChange={e => setCashbackPercentageState(e.target.value)} />
                        <div className="form-text">Provide a percentage value for every dollar spent.</div>
                    </div>

                    <div className="mb-3"
                        style={{display: cashbackTypeState == "reimbursement" ? "block" : "none"}}>
                        <label for="cashback-reimbursement" className="form-label">Cashback Reimbursement $</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cashback-reimbursement" step="10"
                            value={cashbackReimbursementState}
                            onChange={e => setCashbackReimbursementState(e.target.value)} />
                        <div className="form-text">Amount reimbursed for satisfying the promotion's requirements.</div>
                    </div>

                    <div className="mb-3">
                        <label for="spending-min" className="form-label">Spending Minimum $</label>
                        <input className="form-control" id="spending-min"
                            type="text" spellcheck="false"
                            value={spendingMinState}
                            onChange={e => setSpendingMinState(e.target.value)} />
                        <div className="form-text">Optional minimum amount that must be spent for promotion to apply.</div>
                    </div>

                    <div className="mb-3">
                        <label for="name" className="form-label">Spending Maximum $</label>
                        <input className="form-control" type="text" spellcheck="false" id="name"
                            value={spendingMaxState}
                            onChange={e => setSpendingMaxState(e.target.value)} />
                        <div className="form-text">Optional maximum amount until the promotion stops applying.</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label" for="spending-cycle">Spending Cycle</label>
                        <div>
                            <select className="form-select" id="spending-cycle"
                                value={spendingCycleState}
                                onChange={e => setSpendingCycleState(e.target.value)}>
                                <option value="none">None</option>
                                <option value="annually">Annually</option>
                                <option value="monthly">Monthly</option>
                                <option value="daily">Daily</option>
                                <option value="billing">Billing Cycle</option>
                            </select>
                        </div>
                        <div className="form-text">When do maximum and minimum caps reset and when cashback rewards are tracked.</div>
                    </div>

                    <div className="mb-4">
                        <div class="form-check">
                            <input className="form-check-input" type="checkbox" id="enrollment-required"
                                value={isRequiresEnrollmentState}
                                onChange={e => setIsRequiresEnrollmentState(e.target.value)} />
                            <label className="form-check-label" for="enrollment-required">Promotion requires enrollment</label>
                        </div>
                        <div className="form-text">Promotion is not automatically active and requires users to manually enroll.</div>
                    </div>

                    <div className="mb-4 p-3 rounded border bg-light">
                        <p className="mb-0"><b>Included Businesses</b></p>
                        <p className="mt-0 mb-3">Configure business that the promotion applies to.</p>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="inclusions-apply"
                                value={isOnlyIncludedBusinessesState}
                                onChange={e => setIsOnlyIncludedBusinessesState(e.target.value)} />
                            <label className="form-check-label" for="inclusions-apply">Promotion only applies to specific businesses</label>
                        </div>
                        <div className="form-text mb-3">Leaving unselected assumes promotion applies to all transactions, barring excluded businesses.</div>

                        <label className="form-label" for="included-business-categories">Businesses categories</label>
                        <div className="d-flex mb-2">
                            <select className="form-select" id="included-business-categories"
                                value={selectedIncludedCategoryState}
                                onChange={e => addCategoryInclusion(e.target.value)}>
                                <option value="">Select category to include</option>
                                {globalBusinessCategoriesState.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <MultiSelect
                                itemsState={includedCategoriesState}
                                setItemsState={setIncludedCategoriesState} />
                        </div>

                        <label className="form-label" for="included-businesses">Specific businesses</label>
                        <div className="d-flex mb-2">
                            <input
                                className="form-control"
                                type="text"
                                spellcheck="false"
                                id="included-businesses"
                                value={includedBusinessInputState}
                                onChange={e => setIncludedBusinessInputState(e.target.value)}/>
                            <button
                                style={{width: 160}}
                                className="btn btn-primary ms-2"
                                id="included-businesses-add"
                                value={includedBusinessInputState}
                                onClick={e => {
                                    e.preventDefault()
                                    addBusinessInclusion()
                                }}>Add Inclusion</button>
                        </div>

                        <div className="mb-3">
                            <MultiSelect
                                itemsState={includedBusinessesState}
                                setItemsState={setIncludedBusinessesState} />
                        </div>
                    </div>

                    <div className="mb-4 p-3 rounded border bg-light">
                        <p className="mb-0"><b>Excluded Businesses</b></p>
                        <p className="mt-0 mb-3">Configure businesses that are excluded from the promotion.</p>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="exclusions-apply"
                                value={isOnlyExcludedBusinessesState}
                                onChange={e => setIsOnlyExcludedBusinessesState(e.target.value)} />
                            <label className="form-check-label" for="exclusions-apply">Promotion excludes specific businesses</label>
                        </div>

                        <label className="form-label" for="excluded-business-categories">Businesses categories</label>
                        <div className="d-flex mb-2">
                            <select className="form-select" id="excluded-business-categories"
                            value={selectedExcludedCategoryState}
                            onChange={e => addCategoryExclusion(e.target.value)}>
                                <option value="">Select category to exclude</option>
                                {globalBusinessCategoriesState.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <MultiSelect
                                itemsState={excludedCategoriesState}
                                setItemsState={setExcludedCategoriesState} />
                        </div>

                        <label className="form-label" for="excluded-businesses">Specific businesses</label>
                        <div className="d-flex mb-2">
                            <input
                                className="form-control"
                                id="excluded-businesses"
                                type="text" 
                                spellcheck="false"
                                value={excludedBusinessInputState}
                                onChange={e => setExcludedBusinessInputState(e.target.value)} />
                            <button
                                style={{width: 160}}
                                className="btn btn-primary ms-2" 
                                id="excluded-businesses-add"
                                onClick={e => {
                                    e.preventDefault()
                                    addBusinessExclusion()
                                }}>Add Exclusion</button>
                        </div>

                        <div className="mb-3">
                            <MultiSelect
                                itemsState={excludedBusinessesState}
                                setItemsState={setExcludedBusinessesState} />
                        </div>
                    </div>

                    <div className="mb-4 p-3 rounded border bg-light">
                        <p className="mb-0"><b>Time Period</b></p>
                        <p className="mt-0 mb-3">Configure the time period that this promotion applies.</p>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="time-period-applies"
                                value={isTimePeriodState}
                                onChange={e => setIsTimePeriodState(e.target.value)} />
                            <label className="form-check-label" for="time-period-applies">Promotion is only active for a period of time</label>
                        </div>

                        <div className="mb-3">
                            <label for="time-period-start" className="form-label">Start Date of Promotion</label>
                            <input type="datetime-local" className="form-control" id="time-period-start"
                                value={timePeriodStartState}
                                onChange={e => setTimePeriodStartState(e.target.value)} />
                            <div className="form-text">Optional, only providing end date assumes promotion is already active.</div>
                        </div>

                        <div className="mb-3">
                            <label for="time-period-end" className="form-label">End Date of Promotion</label>
                            <input type="datetime-local" className="form-control" id="time-period-end"
                                value={timePeriodEndState}
                                onChange={e => setTimePeriodEndState(e.target.value)} />
                        </div>
                    </div>

                    <div className="mb-4 p-3 rounded border bg-light">
                        <p className="mb-3"><b>Introductory Offer</b></p>
                        {/* <p className="mt-0 mb-3">Configure</p> */}

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" id="is-introductory"
                                value={isIntroductoryState}
                                onChange={e => setIsIntroductoryState(e.target.value)} />
                            <label className="form-check-label" for="is-introductory">Promotion is an introductory offer</label>
                        </div>

                        <div className="mb-3">
                            <label for="introductory-days-length" className="form-label">Length of promotion (days)</label>
                            <input type="number" className="form-control" id="introductory-days-length"
                                value={introductoryLengthState}
                                onChange={e => setIntroductoryLengthState(e.target.value)} />
                            <div className="form-text">Length in days of introductory promotion. Will be relative to user's payment method signup date.</div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mb-4">Save</button>
                </form>
            </div>
        </RootLayout>
    )
}
export default NewPromotionPage
