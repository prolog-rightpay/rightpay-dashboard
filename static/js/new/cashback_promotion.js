// hide/showing reimbursement/cashback by toggling

const cashbackTypeInput = document.querySelector("#cashback-type")
const cashbackPercentageContainer = document.querySelector("#cashback-percentage-container")
const cashbackReimbursementContainer = document.querySelector("#cashback-reimbursement-container")

cashbackTypeState = "percentage"
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
