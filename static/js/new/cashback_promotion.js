// hide/showing reimbursement/cashback by toggling
const cashbackTypeInput = document.querySelector("#cashback-type")
const cashbackPercentageContainer = document.querySelector("#cashback-percentage-container")
const cashbackReimbursementContainer = document.querySelector("#cashback-reimbursement-container")

var cashbackTypeState = "percentage"
function cashbackTypeStateUpdate(newState) {
    if (newState == cashbackTypeState) { return }
    cashbackTypeState = newState
    
    cashbackPercentageContainer.style.display = newState == "percentage" ? "block" : "none"
    cashbackReimbursementContainer.style.display = newState == "percentage" ? "none" : "block"
}

cashbackTypeInput.addEventListener("change", e => {
    const value = e.target.value
    if (value == "reimbursement") {
        cashbackTypeStateUpdate("reimbursement")
    } else {
        cashbackTypeStateUpdate("percentage")
    }
})

// multiselect for the business category inclusions
const inclusionBusinessCategoriesMultiselect = new Multiselect(
    document.querySelector("#included-business-categories"),
    document.querySelector("#included-business-categories-add"),
    document.querySelector("#included-business-categories-items")
)

// multiselect for the business inclusions
const inclusionBusinessesMultiselect = new Multiselect(
    document.querySelector("#included-businesses"),
    document.querySelector("#included-businesses-add"),
    document.querySelector("#included-businesses-items")
)

// multiselect for the business category exclusions
const excludedBusinessCategoriesMultiselect = new Multiselect(
    document.querySelector("#excluded-business-categories"),
    document.querySelector("#excluded-business-categories-add"),
    document.querySelector("#excluded-business-categories-items")
)

// multiselect for the business exclusions
const excludedBusinessesMultiselect = new Multiselect(
    document.querySelector("#excluded-businesses"),
    document.querySelector("#excluded-businesses-add"),
    document.querySelector("#excluded-businesses-items")
)

const paymentMethods = [
    {
        id: "aaa",
        name: "Chase Freedom"
    },
    {
        id: "bbb",
        name: "American Express Platnium Card"
    }
]

// form data collection and POST
function getOptionalNumberValue(e, err) {
    let val = e.value
    console.log(val.length)
    if (val.length > 0) {
        val = parseFloat(val)
        if (isNaN(val)) { throw new Error(err) }
        return val
    } else { return undefined }
}

function getOptionalSelectValue(e) {
    let val = e.selectedIndex
    if (e.selectedIndex == 0) { return undefined }
    else {
        return e.options[e.selectedIndex].value
    }
}

function getFormData(form) {
    var data = { }

    const paymentMethodIndex = form.elements["payment-method"].selectedIndex
    if (paymentMethodIndex == 0) { throw new Error("Missing payment method") }
    data.payment_method_id = paymentMethods[paymentMethodIndex - 1].id

    let cashbackType = cashbackTypeState
    data.cashback_type = cashbackType

    if (cashbackType == "percentage") {
        const cashbackPercentage = form.elements["cashback-percentage"].value
        if (isNaN(cashbackPercentage)) { throw new Error("Invalid cashback percentage") }
        data.cashback_percentage = parseFloat(cashbackPercentage)
    } else if (cashbackType == "reimbursement") {
        const reimbursementAmount = form.elements["cashback-reimbursement"].value
        if (isNaN(reimbursementAmount)) { throw new Error("Invalid reimbursement amount") }
        data.reimbursement_amount = parseFloat(reimbursementAmount)
    }

    const spendingMin = getOptionalNumberValue(form["spending-min"], "Invalid spending minimum")
    if (spendingMin != undefined) { data.spending_min = spendingMin }

    const spendingMax = getOptionalNumberValue(form["spending-max"], "Invalid spending maximum")
    if (spendingMax != undefined) { data.spending_max = spendingMax }

    const spendingCycle = getOptionalSelectValue(form["spending-cycle"])
    if (spendingCycle != undefined) { data.spending_cycle = spendingCycle }

    data.enrollment_required = form["enrollment-required"].checked

    const inclusions = form["inclusions-apply"].checked
    data.inclusions = inclusions
    if (inclusions) {
        const categories = inclusionBusinessCategoriesMultiselect.getItemValues()
        data.included_categories = categories

        const businesses = inclusionBusinessesMultiselect.getItemValues()
        data.included_businesses = businesses
    }

    const exclusions = form["exclusions-apply"].checked
    data.exclusions = exclusions
    if (exclusions) {
        const categories = excludedBusinessCategoriesMultiselect.getItemValues()
        data.excluded_categories = categories

        const businesses = excludedBusinessesMultiselect.getItemValues()
        data.excluded_businesses = businesses
    }

    const timePeriodApplies = form["time-period-applies"].checked
    if (timePeriodApplies) {
        let timePeriodStart = form["time-period-start"].value
        if (timePeriodStart.length > 0) {
            timePeriodStart = (new Date(timePeriodStart)).toISOString()
            data.time_period_start = timePeriodStart
        }
        let timePeriodEnd = form["time-period-end"].value
        if (timePeriodEnd.length > 0) {
            timePeriodEnd = (new Date(timePeriodEnd)).toISOString()
            data.time_period_end = timePeriodEnd
        }
    }

    const introductoryOffer = form["is-introductory"]
    if (introductoryOffer) {
        let introductoryDaysLength = parseFloat(form["introductory-days-length"].value)
        if (isNaN(introductoryDaysLength)) {
            throw new Error("Invalid introductory days offer")
        }
        data.introductory_days = introductoryDaysLength
    }

    console.log(data)
}

const form = document.querySelector("#form")
form.addEventListener("submit", e => {
    e.preventDefault()
    try {
        getFormData(form)
    } catch (e) {
        alert("Error: " + e.message)
    }
    
})
