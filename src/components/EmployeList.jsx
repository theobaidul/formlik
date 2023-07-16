import TableItem from './TableItem';

export default function EmployeList({ list, handleListChange, changeFormValue, updateFormState }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Age</th>
                    <th>Name</th>
                    <th>Designation</th>
                </tr>
            </thead>
            <tbody>
                {list?.map((employe) => (
                    <TableItem
                        key={employe?.id}
                        employe={employe}
                        handleListChange={handleListChange}
                        changeFormValue={changeFormValue}
                        updateFormState={updateFormState}
                    />
                ))}
            </tbody>
        </table>
    );
}
