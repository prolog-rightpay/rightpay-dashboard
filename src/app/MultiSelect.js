const MultiSelect = ({ itemsState, setItemsState }) => {

    function deleteItem(index) {
        const updated = [...itemsState.slice(0, index), ...itemsState.slice(index + 1)]
        setItemsState(updated)
    }

    return (
        <div>
            {itemsState.map((item, index) => (
                <span className="pt-1 pb-1 ps-2 pe-2 btn btn-primary me-1" onClick={_ => deleteItem(index)}>
                    <>{item}</>
                    <b> x</b>
                </span>
            ))}
        </div>
    )
}
export default MultiSelect
