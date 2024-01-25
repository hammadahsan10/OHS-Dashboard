

import { InputText } from 'primereact/inputtext'
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';

const Form6 = ({myData, formData, handleChange }) => {

    console.log("formData 6", formData)
    const role_Name = localStorage.getItem('role_Name')

    const validationSchema = Yup.object().shape({
        value24: Yup.mixed().required("This field is required."),
        value25: Yup.mixed().required("This field is required."),
        value26: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            value24: "",
            value25: "",
            value26: "",
        },

        onSubmit: async (data) => {

            const obj = {
                key24: myData?.key24,
                value24: formik.values.value24,
                key25: myData?.key25,
                value25: formik.values.value25,
                key26: myData?.key26,
                value26: formik.values.value26,
            }

            handleChange({
                ...formData,
                form6Data: obj
            })

        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    useEffect(() => {
        if (role_Name == "Manager" || role_Name == "Admin" || role_Name == "Individual") {

            const propertyNames = Object.keys(myData)
                .filter(key => key.startsWith("value"));

            if (propertyNames) {
                propertyNames.forEach(key => {
                    formik.setFieldValue(key, myData[key]);
                });
            }
        }

    }, [role_Name])

    return (

        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid formgrid grid pl-5 pr-5">

                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key24}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false}  placeholder='Enter' className="p-inputtext-sm" id="value24" name="value24" value={formik.values.value24} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value24")}
                    </div>
                    
                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key25}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value25" name="value25" value={formik.values.value25} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value25")}
                    </div>
                    
                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key26}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value26" name="value26" value={formik.values.value26} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value26")}
                    </div>

                    <div className='col-12 text-center mt-2 pb-2'>
                        <Button
                            className="Save-Button w-3 ml-2"
                            label="Next"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form6
