class Multiselect {

    configureItemClick(id, itemElement) {
        itemElement.addEventListener("click", e => {
            e.preventDefault()
            itemElement.remove()
            for (const i in this.items) {
                if (this.items[i].id == id) {
                    delete this.items[i]
                    break
                }
            }
        })
    }

    configureInputs() {
        this.addButton.addEventListener("click", e => {
            e.preventDefault()

            let value = ""
            let selectedIndex = this.valueInput.selectedIndex
            let inputValue = this.valueInput.value
            if (selectedIndex != undefined) {
                if (this.valueInput.selectedIndex == 0) { return }
                value = this.valueInput.options[selectedIndex].innerText
            } else if (inputValue != undefined) {
                if (inputValue.length == 0) { return }
                value = inputValue
            } else { return }

            for (const existingValue of this.getItemValues()) {
                if (existingValue == value) {
                    this.valueInput.value = ""
                    return
                }
            }
            
            const itemElement = document.createElement("span")
            itemElement.className = "pt-1 pb-1 ps-2 pe-2 btn btn-primary me-1"
            itemElement.innerText = value
            itemElement.innerHTML += " <b>x</b>"
            this.itemContainer.appendChild(itemElement)

            this.valueInput.value = ""

            const id = Date.now()
            this.items.push({
                id: id,
                value: value,
                element: itemElement
            })

            this.configureItemClick(id, itemElement)
        })
    }

    /**
     * Get only the item values.
     * @returns {string[]}
     */
    getItemValues() {
        const itemValues = this.items.map(item => item.value)
        return itemValues
    }

    constructor(valueInput, addButton, itemContainer) {
        this.valueInput = valueInput
        this.addButton = addButton
        this.itemContainer = itemContainer

        this.items = []

        this.configureInputs()
    }
}
