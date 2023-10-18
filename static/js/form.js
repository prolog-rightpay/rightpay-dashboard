function getSelectValue(select) {
    if (select.selectedIndex == 0) { return null }
    else { return select.options[select.selectedIndex].value }
}
