

import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { handlePutRequest } from '../../../../services/PutTemplate';

const Form5 = ({ myData, formData, handleChange }) => {

    const role_Name = localStorage.getItem('role_Name')

    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        value21: Yup.mixed().required("This field is required."),
        value22: Yup.mixed().required("This field is required."),
        value23: Yup.mixed().required("This field is required."),
        value24: Yup.mixed().required("This field is required."),
        value25: Yup.mixed().required("This field is required."),
        value26: Yup.mixed().required("This field is required."),
        value27: Yup.mixed().required("This field is required."),
        value28: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            value21: "",
            value22: "",
            value23: "",
            value24: "",
            value25: "",
            value26: "",
            value27: "",
            value28: "",
        },

        onSubmit: async (data) => {

            const obj = {
                key21: myData?.key21,
                value21: formik.values.value21,
                key22: myData?.key22,
                value22: formik.values.value22,
                key23: myData?.key23,
                value23: formik.values.value23,
                key24: myData?.key24,
                value24: formik.values.value24,
                key25: myData?.key25,
                value25: formik.values.value25,
                key26: myData?.key26,
                value26: formik.values.value26,
                key27: myData?.key27,
                value27: formik.values.value27,
                key28: myData?.key28,
                value28: formik.values.value28,
            }

            const updatedFormData = {
                ...formData,
                form5Data: obj
            };

            handleChange(updatedFormData);

            const flattenedData = Object.keys(updatedFormData).reduce((result, formKey) => {
                const formData = updatedFormData[formKey];

                Object.keys(formData).forEach((key) => {
                    result[key] = formData[key];
                });

                return result;
            }, {});

            console.log("flattenedData", flattenedData);
            const response = await dispatch(handlePutRequest(flattenedData, `/api/userSurvey/update/${myData?._id}`, true, true));
            if (response?.status == 200) {

            }
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

                    <div className="field col-12 md:col-6 pl-6 pr-6">
                        <label>{myData?.key21}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value21" name="value21" value={formik.values.value21} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value21")}
                    </div>

                    <div className="field col-12 md:col-6 pl-6 pr-6">
                        <label>{myData?.key22}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value22" name="value22" value={formik.values.value22} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value22")}
                    </div>

                    <div className="field col-12 md:col-6 pl-6 pr-6">
                        <label>{myData?.key23}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' id="value23" name="value23" value={formik.values.value23} onChange={formik.handleChange} type="text" className="p-inputtext-sm"></InputText>
                        {getFormErrorMessage("value23")}
                    </div>

                    <div className="field col-12 md:col-6 pl-6 pr-6">
                        <label>{myData?.key24}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' id="value24" name="value24" value={formik.values.value24} onChange={formik.handleChange} className="p-inputtext-sm"></InputText>
                        {getFormErrorMessage("value24")}
                    </div>

                    <div className="field col-12 md:col-6 pl-6 pr-6">
                        <label>{myData?.key25}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value25" name="value25" value={formik.values.value25} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value25")}
                    </div>

                    <div className="field col-12 md:col-6 pl-6 pr-6">
                        <label>{myData?.key26}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value26" name="value26" value={formik.values.value26} onChange={formik.handleChange} type="text" />
                        {getFormErrorMessage("value26")}
                    </div>

                    <div className="field col-12 md:col-6 pl-6 pr-6">
                        <label>{myData?.key27}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' id="value27" name="value27" value={formik.values.value27} onChange={formik.handleChange} type="text" className="p-inputtext-sm"></InputText>
                        {getFormErrorMessage("value27")}
                    </div>

                    <div className="field col-12 md:col-6 pl-6 pr-6">
                        <label>{myData?.key28}</label>
                        <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' id="value28" name="value28" value={formik.values.value28} onChange={formik.handleChange} className="p-inputtext-sm"></InputText>
                        {getFormErrorMessage("value28")}
                    </div>

                    <div className='col-12 text-center mt-2 pb-2'>
                        <Button
                            disabled={role_Name == 'Manager' ? true : false}
                            className="Save-Button w-3 ml-2"
                            label="Submit Survey"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form5
