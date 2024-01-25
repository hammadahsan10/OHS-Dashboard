

import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { Rating } from "primereact/rating";
import { Badge } from 'primereact/badge';

const Form3 = ({ myData, formData, handleChange }) => {

  const role_Name = localStorage.getItem('role_Name')

  const validationSchema = Yup.object().shape({
    value13: role_Name == 'Individual' ? Yup.mixed().required("This field is required.") : null,
    value14: role_Name == 'Admin' ? Yup.mixed().required("This field is required.") : null,
    value15: role_Name == 'Individual' ? Yup.mixed().required("This field is required.") : null,
    value16: role_Name == 'Admin' ? Yup.mixed().required("This field is required.") : null,
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

          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: "100%" }}>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key13}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name === 'Manager' || role_Name === 'Admin' ? true : false} id='value13' name='value13' value={formik.values.value13} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Me' /> </span>
                </span>
                {getFormErrorMessage("value13")}
              </div>
            </div>

            <div className='col-12 flex flex-row'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key14}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name === 'Manager' || role_Name === 'Individual' ? true : false} id='value14' name='value14' value={formik.values.value14} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Manager' /> </span>
                </span>
                {getFormErrorMessage("value14")}
              </div>
            </div>
          </div>


          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: "100%" }} className='mt-4'>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key15}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} id='value15' name='value15' value={formik.values.value15} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Me' /> </span>
                </span>
                {getFormErrorMessage("value15")}
              </div>
            </div>

            <div className='col-12 flex flex-row'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key16}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name == 'Manager' || role_Name === 'Individual' ? true : false} id='value16' name='value16' value={formik.values.value16} onChange={formik.handleChange} cancel={false} />
                  <span className='ml-3' style={{ marginTop: "-2px" }}> <Badge value='Manager' /> </span>
                </span>
                {getFormErrorMessage("value16")}
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

export default Form3
