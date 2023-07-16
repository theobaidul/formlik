import { useFormik } from 'formik';
import { useState } from 'react';
import Select from 'react-select';
import * as Yup from 'yup';
import getRandomId from '../utils/getRandomId';
import EmployeList from './EmployeList';

const initData = {
    age: '',
    name: '',
    designation: '',
};

const employeSchema = Yup.object().shape({
    age: Yup.number().required('Required'),
    name: Yup.string().required('Required'),
    designation: Yup.object().shape({
        label: Yup.string().required('Required'),
        value: Yup.string().required('Required'),
    }),
});

export default function BasicForm() {
    const [list, setList] = useState([]);
    const [editable, setEditable] = useState(false);
    const formik = useFormik({
        initialValues: initData,
        validationSchema: employeSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setList((prevList) => {
                if (editable) {
                    return prevList?.map((listItem) =>
                        listItem?.id === values?.id ? values : listItem
                    );
                }
                return [...prevList, { id: getRandomId(), ...values }];
            });
            setEditable(false);
            resetForm(initData);
            setSubmitting(false);
        },
    });

    const options = [
        { value: 'Frontend', label: 'Frontend' },
        { value: 'Backend', label: 'Backend' },
        { value: 'Fullstack', label: 'Fullstack' },
    ];

    return (
        <div>
            <h1>Anywhere in your app!</h1>
            <form onSubmit={formik?.handleSubmit}>
                <input
                    type="number"
                    name="age"
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik?.values.age}
                />
                {formik?.errors.age && formik?.touched.age && formik?.errors.age}
                <input
                    type="text"
                    name="name"
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik?.values.name}
                />
                {formik?.errors.name && formik?.touched.name && formik?.errors.name}
                <Select
                    options={options}
                    onChange={(valueOption) => {
                        formik?.setFieldValue('designation', valueOption);
                    }}
                    name="designation"
                    value={formik?.values.designation}
                />
                {formik?.errors.designation?.value &&
                    formik?.touched.designation &&
                    formik?.errors.designation?.value}
                <button type="submit" disabled={formik?.isSubmitting}>
                    {editable ? 'Save' : 'Submit'}
                </button>
            </form>
            <EmployeList
                list={list}
                handleListChange={setList}
                changeFormValue={formik?.setValues}
                updateFormState={setEditable}
            />
        </div>
    );
}
