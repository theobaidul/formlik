export default function TableItem({ employe, handleListChange, changeFormValue, updateFormState }) {
    const { id, age, name, designation } = employe;
    const handleEdit = () => {
        updateFormState(true);
        changeFormValue(employe);
    };
    const handleDelete = () => {
        handleListChange((prevList) => {
            return prevList?.filter((listItem) => listItem?.id !== id);
        });
    };
    return (
        <tr>
            <th>{age}</th>
            <th>{name}</th>
            <th>{designation?.value}</th>
            <th>
                <button type="button" onClick={handleEdit}>
                    Edit
                </button>
            </th>
            <th>
                <button type="button" onClick={handleDelete}>
                    Delete
                </button>
            </th>
        </tr>
    );
}
