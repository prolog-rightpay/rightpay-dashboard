function loadSelect(select, items) {
    for (const option of Array.from(select.options).slice(1)) {
        option.remove()
    }
    for (const item of items) {
        const option = document.createElement("option")
        option.text = item
        select.add(option)
    }
}
