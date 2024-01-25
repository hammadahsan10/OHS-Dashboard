

import { InputText } from 'primereact/inputtext'
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { handlePutRequest } from '../../../../services/PutTemplate';
import { useDispatch } from 'react-redux';

const Form8 = ({ myData, formData, handleChange }) => {

  const role_Name = localStorage.getItem('role_Name')
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    value31: Yup.mixed().required("This field is required."),
    value32: Yup.mixed().required("This field is required."),
    value33: Yup.mixed().required("This field is required."),
  });

  const formik = useFormik({

    validationSchema: validationSchema,
    initialValues: {
      value31: "",
      value32: "",
      value33: "",
    },

    onSubmit: async (data) => {

      const obj = {
        key31: myData?.key31,
        value31: formik.values.value31,
        key32: myData?.key32,
        value32: formik.values.value32,
        key33: myData?.key33,
        value33: formik.values.value33,
      }

      const updatedFormData = {
        ...formData,
        form8Data: obj
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
                <label>{myData?.key31}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <Rating disabled={role_Name === 'Manager' || role_Name === 'Admin' ? true : false} id='value31' name='value31' value={formik.values.value31} onChange={formik.handleChange} cancel={false} />
                </span>
                {getFormErrorMessage("value31")}
              </div>
            </div>
          </div>

          <div style={{ padding: '6px', width: "100%" }}>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key32}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value32" name="value32" value={formik.values.value32} onChange={formik.handleChange} type="text" />
                </span>
                {getFormErrorMessage("value32")}
              </div>
            </div>
          </div>

          <div style={{ padding: '6px', width: "100%" }}>
            <div className='col-12 flex flex-row mt-4'>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <label>{myData?.key33}</label>
              </div>
              <div className="field col-12 md:col-6 pl-6 pr-6">
                <span className='flex flex-row'>
                  <InputText disabled={role_Name == 'Manager' || role_Name == 'Admin' ? true : false} placeholder='Enter' className="p-inputtext-sm" id="value33" name="value33" value={formik.values.value33} onChange={formik.handleChange} type="text" />
                </span>
                {getFormErrorMessage("value33")}
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

export default Form8
