

import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { Rating } from "primereact/rating";
import { Badge } from 'primereact/badge';

const Form2 = ({ myData, formData, handleChange }) => {

  const role_Name = localStorage.getItem('role_Name')

  const validationSchema = Yup.object().shape({
    value9: role_Name == 'Individual' ? Yup.mixed().required("This field is required.") : null,
    value10: role_Name == 'Admin' ? Yup.mixed().required("This field is required.") : null,
    value11: role_Name == 'Individual' ? Yup.mixed().required("This field is required.") : null,
    value12: role_Name == 'Admin' ? Yup.mixed().required("This field is required.") : null,
  });

  const formik = useFormik({

    validationSchema: validationSchema,
    initialValues: {
      value9: "",
      value10: "",
      value11: "",
      value12: "",
    },

    onSubmit: async (data) => {

      const obj = {
        key9: myData?.key9,
        value9: formik.values.value9,
        key10: myData?.key10,
        value10: formik.values.value10,
        key11: myData?.key11,
        value11: formik.values.value11,
        key12: myData?.key12,
        value12: formik.values.value12,
      }

      handleChange({
        ...formData,
        form2Data: obj
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
                <label>{myData?.key9}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name === 'Manager' || role_Name === 'Admin' ? true : false} id='value9' name='value9' value={formik.values.value9} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Me' /> </span>
                </span>
                {getFormErrorMessage("value9")}
              </div>
            </div>

            <div className='col-12 flex flex-row'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key10}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name === 'Manager' || role_Name === 'Individual' ? true : false} id='value10' name='value10' value={formik.values.value10} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Manager' /> </span>
                </span>
                {getFormErrorMessage("value10")}
              </div>
            </div>
          </div>


          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: "100%" }} className='mt-4'>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key11}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} id='value11' name='value11' value={formik.values.value11} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Me' /> </span>
                </span>
                {getFormErrorMessage("value11")}
              </div>
            </div>

            <div className='col-12 flex flex-row'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key12}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name == 'Manager' || role_Name === 'Individual' ? true : false} id='value12' name='value12' value={formik.values.value12} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Manager' /> </span>
                </span>
                {getFormErrorMessage("value12")}
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

export default Form2
