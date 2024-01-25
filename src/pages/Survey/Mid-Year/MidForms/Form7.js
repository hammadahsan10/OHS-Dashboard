

import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { Rating } from "primereact/rating";
import { Badge } from 'primereact/badge';

const Form7 = ({ myData, formData, handleChange }) => {

    const role_Name = localStorage.getItem('role_Name')

    const validationSchema = Yup.object().shape({
        value27: role_Name == 'Individual' ? Yup.mixed().required("This field is required.") : null,
        value28: role_Name == 'Admin' ? Yup.mixed().required("This field is required.") : null,
        value29: role_Name == 'Individual' ? Yup.mixed().required("This field is required.") : null,
        value30: role_Name == 'Admin' ? Yup.mixed().required("This field is required.") : null,
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            value27: "",
            value28: "",
            value29: "",
            value30: "",
        },

        onSubmit: async (data) => {

            const obj = {
                key27: myData?.key27,
                value27: formik.values.value27,
                key28: myData?.key28,
                value28: formik.values.value28,
                key29: myData?.key29,
                value29: formik.values.value29,
                key30: myData?.key30,
                value30: formik.values.value30,
            }

            handleChange({
                ...formData,
                form7Data: obj
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

                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: "100%" }}>
                        <div className='col-12 flex flex-row mt-4'>
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <label>{myData?.key27}</label>
                            </div>
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <span className='flex flex-row'>
                                    <Rating disabled={role_Name === 'Manager' || role_Name === 'Admin' ? true : false} id='value27' name='value27' value={formik.values.value27} onChange={formik.handleChange} cancel={false} />
                                    <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Me' /> </span>
                                </span>
                                {getFormErrorMessage("value27")}
                            </div>
                        </div>

                        <div className='col-12 flex flex-row'>
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <label>{myData?.key28}</label>
                            </div>
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <span className='flex flex-row'>
                                    <Rating disabled={role_Name === 'Manager' || role_Name === 'Individual' ? true : false} id='value28' name='value28' value={formik.values.value28} onChange={formik.handleChange} cancel={false} />
                                    <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Manager' /> </span>
                                </span>
                                {getFormErrorMessage("value28")}
                            </div>
                        </div>
                    </div>


                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: "100%" }} className='mt-4'>
                        <div className='col-12 flex flex-row mt-4'>
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <label>{myData?.key29}</label>
                            </div>
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <span className='flex flex-row'>
                                    <Rating disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} id='value29' name='value29' value={formik.values.value29} onChange={formik.handleChange} cancel={false} />
                                    <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Me' /> </span>
                                </span>
                                {getFormErrorMessage("value29")}
                            </div>
                        </div>

                        <div className='col-12 flex flex-row'>
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <label>{myData?.key30}</label>
                            </div>
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <span className='flex flex-row'>
                                    <Rating disabled={role_Name == 'Manager' || role_Name === 'Individual' ? true : false} id='value30' name='value30' value={formik.values.value30} onChange={formik.handleChange} cancel={false} />
                                    <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Manager' /> </span>
                                </span>
                                {getFormErrorMessage("value30")}
                            </div>
                        </div>
                    </div>

                    <div className='col-12 text-center mt-3 pb-2'>
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

export default Form7
