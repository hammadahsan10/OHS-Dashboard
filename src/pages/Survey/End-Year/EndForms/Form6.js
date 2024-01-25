

import { InputText } from 'primereact/inputtext'
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { handlePutRequest } from '../../../../services/PutTemplate';
import { useDispatch } from 'react-redux';

const Form6 = ({ myData, formData, handleChange }) => {

  const role_Name = localStorage.getItem('role_Name')
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    value25: Yup.mixed().required("This field is required."),
    value26: Yup.mixed().required("This field is required."),
    value27: Yup.mixed().required("This field is required."),
  });

  const formik = useFormik({

    validationSchema: validationSchema,
    initialValues: {
      value25: "",
      value26: "",
      value27: "",
    },

    onSubmit: async (data) => {

      const obj = {
        key25: myData?.key25,
        value25: formik.values.value25,
        key26: myData?.key26,
        value26: formik.values.value26,
        key27: myData?.key27,
        value27: formik.values.value27,
      }

      const updatedFormData = {
        ...formData,
        form6Data: obj
      };

      handleChange(updatedFormData);

      console.log("updatedFormData", updatedFormData)
      console.log("formData", formData)
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

          <div style={{ padding: '6px', width: "100%" }}>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key25}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name === 'Manager' || role_Name === 'Admin' ? true : false} id='value25' name='value25' value={formik.values.value25} onChange={formik.handleChange} cancel={false} />
                </span>
                {getFormErrorMessage("value25")}
              </div>
            </div>
          </div>

          <div style={{ padding: '6px', width: "100%" }}>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key26}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value26" name="value26" value={formik.values.value26} onChange={formik.handleChange} type="text" />
                </span>
                {getFormErrorMessage("value26")}
              </div>
            </div>
          </div>

          <div style={{ padding: '6px', width: "100%" }}>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key27}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value27" name="value27" value={formik.values.value27} onChange={formik.handleChange} type="text" />
                </span>
                {getFormErrorMessage("value27")}
              </div>
            </div>
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

export default Form6
