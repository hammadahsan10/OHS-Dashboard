

import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';

const Form3 = ({myData, formData, handleChange }) => {

    const role_Name = localStorage.getItem('role_Name')

    const validationSchema = Yup.object().shape({
        value13: Yup.mixed().required("This field is required."),
        value14: Yup.mixed().required("This field is required."),
        value15: Yup.mixed().required("This field is required."),
        value16: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            value13: "",
            value14: "",
            value15: "",
            value16: "",
        },

        onSubmit: async (data) => {

            const obj = {
                key13: myData?.key13,
                value13: formik.values.value13,
                key14: myData?.key14,
                value14: formik.values.value14,
                key15: myData?.key15,
                value15: formik.values.value15,
                key16: myData?.key16,
                value16: formik.values.value16,
            }

            handleChange({
                ...formData,
                form3Data: obj
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
                        <label>{myData?.key13}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false}  placeholder='Enter' className="p-inputtext-sm" id="value13" name="value13" value={formik.values.value13} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value13")}
                    </div>
                    
                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key14}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value14" name="value14" value={formik.values.value14} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value14")}
                    </div>
                    
                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key15}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value15" name="value15" value={formik.values.value15} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value15")}
                    </div>

                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key16}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value16" name="value16" value={formik.values.value16} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value16")}
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

export default Form3
