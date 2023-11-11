const referTokenInput = document.querySelector("#refer-token-input")

const params = new URLSearchParams(window.location.search)
const referToken = params.get("refer_token")
if (referToken) {
    // referTokenInput.disabled = true
    referTokenInput.readOnly = true
    referTokenInput.value = referToken
}
