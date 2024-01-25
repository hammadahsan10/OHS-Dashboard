

import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { Rating } from "primereact/rating";
import { Badge } from 'primereact/badge';

const Form5 = ({ myData, formData, handleChange }) => {

  const role_Name = localStorage.getItem('role_Name')

  const validationSchema = Yup.object().shape({
    value20: role_Name == 'Individual' ? Yup.mixed().required("This field is required.") : null,
    value21: role_Name == 'Admin' ? Yup.mixed().required("This field is required.") : null,
    value22: role_Name == 'Individual' ? Yup.mixed().required("This field is required.") : null,
    value23: role_Name == 'Admin' ? Yup.mixed().required("This field is required.") : null,
  });

  const formik = useFormik({

    validationSchema: validationSchema,
    initialValues: {
      value20: "",
      value21: "",
      value22: "",
      value23: "",
    },

    onSubmit: async (data) => {

      const obj = {
        key20: myData?.key20,
        value20: formik.values.value20,
        key21: myData?.key21,
        value21: formik.values.value21,
        key22: myData?.key22,
        value22: formik.values.value22,
        key23: myData?.key23,
        value23: formik.values.value23,
      }

      console.log("obj", obj)

      handleChange({
        ...formData,
        form5Data: obj
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
                <label>{myData?.key20}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name === 'Manager' || role_Name === 'Admin' ? true : false} id='value20' name='value20' value={formik.values.value20} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Me' /> </span>
                </span>
                {getFormErrorMessage("value20")}
              </div>
            </div>

            <div className='col-12 flex flex-row'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key21}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name === 'Manager' || role_Name === 'Individual' ? true : false} id='value21' name='value21' value={formik.values.value21} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Manager' /> </span>
                </span>
                {getFormErrorMessage("value21")}
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: "100%" }} className='mt-4'>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key22}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} id='value22' name='value22' value={formik.values.value22} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Me' /> </span>
                </span>
                {getFormErrorMessage("value22")}
              </div>
            </div>

            <div className='col-12 flex flex-row'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key23}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name == 'Manager' || role_Name === 'Individual' ? true : false} id='value23' name='value23' value={formik.values.value23} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Manager' /> </span>
                </span>
                {getFormErrorMessage("value23")}
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

export default Form5
