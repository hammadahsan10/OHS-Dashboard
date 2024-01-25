

import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';

const Form4 = ({myData, formData, handleChange }) => {

    const role_Name = localStorage.getItem('role_Name')

    const validationSchema = Yup.object().shape({
        value17: Yup.mixed().required("This field is required."),
        value18: Yup.mixed().required("This field is required."),
        value19: Yup.mixed().required("This field is required."),
        value20: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            value17: "",
            value18: "",
            value19: "",
            value20: "",
        },

        onSubmit: async (data) => {

            const obj = {
                key17: myData?.key17,
                value17: formik.values.value17,
                key18: myData?.key18,
                value18: formik.values.value18,
                key19: myData?.key19,
                value19: formik.values.value19,
                key20: myData?.key20,
                value20: formik.values.value20,
            }
            
            handleChange({
                ...formData,
                form4Data: obj
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
                        <label>{myData?.key17}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value17" name="value17" value={formik.values.value17} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value17")}
                    </div>
                    
                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key18}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value18" name="value18" value={formik.values.value18} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value18")}
                    </div>
                    
                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key19}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value19" name="value19" value={formik.values.value19} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value19")}
                    </div>

                    <div className="field col-12 md:col-12 pl-6 pr-6">
                        <label>{myData?.key20}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value20" name="value20" value={formik.values.value20} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value20")}
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

export default Form4
