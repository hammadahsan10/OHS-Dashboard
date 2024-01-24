import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import LoadingOverlay from 'react-loading-overlay';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FileUpload } from 'primereact/fileupload';
import { handlePostRequest } from '../../services/PostTemplate';
import { handlePutRequest } from '../../services/PutTemplate';
import { baseURL } from '../../Config';
import { CustomerSpinner } from '../../components/CustomerSpinner';

const AddEditCompanies2 = ({ onHide, editable, rowObject, getCompanyList }) => {

    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);

    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        companyName: Yup.mixed().required("This field is required."),
        description: Yup.mixed().required("This field is required."),
        phoneNo: Yup.mixed().required("This field is required."),
        address: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            companyName: "",
            description: "",
            phoneNo: "",
            address: "",
        },

        onSubmit: async (data) => {

            if (editable) {

                setSaveBtnLoading(true);
                const obj = {
                    companyName: formik.values.companyName,
                    description: formik.values.description,
                    phoneNo: formik.values.phoneNo,
                    address: formik.values.address,
                    logo: selectedFiles[0]?.base64,
                }

                const response = await dispatch(handlePutRequest(obj, `/api/company/update/${rowObject?._id}`, true, true));
                console.log("response", response)
                if (response?.status == 200) {
                    onHide()
                    await getCompanyList()
                }

                setSaveBtnLoading(false)
            }

            else {

                setSaveBtnLoading(true);
                
                const obj = {
                    companyName: formik.values.companyName,
                    description: formik.values.description,
                    phoneNo: formik.values.phoneNo,
                    address: formik.values.address,
                    logo: selectedFiles[0]?.base64,
                }
                const response = await dispatch(handlePostRequest(obj, "/api/company/create", true, true));
                if (response?.status == 200) {
                    onHide()
                    await getCompanyList()
                }
                setSaveBtnLoading(false)
            }

        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    //File Upload Function
    const handleFileUpload = (event) => {
        const files = Array.from(event.files);

        const updatedFiles = files.map((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setSelectedFiles(() => [

                    { file_extension: file.type, base64: base64String, name: file.name, objectURL: file.objectURL || null }
                ]);
            };
            reader.readAsDataURL(file);

            return file;
        });
    };

    useEffect(() => {

        if (rowObject && editable) {
            console.log("rowObject", rowObject)
            formik.setFieldValue("companyName", rowObject?.companyName)
            formik.setFieldValue("description", rowObject?.description)
            formik.setFieldValue("phoneNo", rowObject?.phoneNo)
            formik.setFieldValue("address", rowObject?.address)
        }
    }, [editable, rowObject])


    return (
        <>
            {saveBtnLoading ? (
                <CustomerSpinner/>
            ) : (
                null
            )}

            <LoadingOverlay
                active={isActive}
                spinner
                text='Loading your content...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgb(38 41 51 / 78%)',
                        width: '107.9%',
                        height: '125%',
                        top: '-27px',
                        left: '-35px'
                    })
                }}
            >

                <form onSubmit={formik.handleSubmit}>
                    <div className="p-fluid formgrid grid pl-5 pr-5">

                        <div className="field col-12 text-center md:col-12 pl-6 pb-6 pr-6">
                            <img
                                src={editable && selectedFiles?.length === 0 ? `${baseURL}/${rowObject?.logo}` : editable && selectedFiles?.length ? selectedFiles[0]?.base64 : selectedFiles?.length ? selectedFiles[0]?.base64 : `data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61 61" width="100px" height="100px">
      <path d="M48.2917 12.7083V48.2917H12.7083V12.7083H48.2917ZM48.2917 7.625H12.7083C9.9125 7.625 7.625 9.9125 7.625 12.7083V48.2917C7.625 51.0875 9.9125 53.375 12.7083 53.375H48.2917C51.0875 53.375 53.375 51.0875 53.375 48.2917V12.7083C53.375 9.9125 51.0875 7.625 48.2917 7.625ZM35.9392 30.1442L28.3142 39.9804L22.875 33.3975L15.25 43.2083H45.75L35.9392 30.1442Z" fill="black" fill-opacity="0.4"/>
    </svg>
  `}
                                width="100px" height="100px"
                                alt="SVG Image"
                                className=""
                            />
                            <FileUpload
                                auto
                                mode="basic"
                                chooseLabel="Choose File"
                                className="p-mt-2"
                                onSelect={handleFileUpload}
                                accept="image/*"
                            />
                        </div>
                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter Company Name' className="p-inputtext-sm" id="companyName" name="companyName" value={formik.values.companyName} onChange={formik.handleChange} type="text" />
                            {getFormErrorMessage("companyName")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter description' className="p-inputtext-sm" id="description" name="description" value={formik.values.description} onChange={formik.handleChange} type="text" />
                            {getFormErrorMessage("description")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter Contact No.' id="phoneNo" name="phoneNo" value={formik.values.phoneNo} onChange={formik.handleChange} type="text" className="p-inputtext-sm"></InputText>
                            {getFormErrorMessage("phoneNo")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter Address' id="address" name="address" value={formik.values.address} onChange={formik.handleChange} className="p-inputtext-sm"></InputText>
                            {getFormErrorMessage("address")}
                        </div>

                        <div className='col-12 text-center mt-4 pb-2'>
                            <Button className="Save-Button w-3 ml-2" label={editable ? "Edit Company" : "Add Company"} type="submit" />
                        </div>

                    </div>
                </form>

            </LoadingOverlay>
        </>
    )
}

export default AddEditCompanies2