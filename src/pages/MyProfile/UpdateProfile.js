import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import LoadingOverlay from 'react-loading-overlay';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FileUpload } from 'primereact/fileupload';
import { handlePutRequest } from '../../services/PutTemplate';
import { CustomerSpinner } from '../../components/CustomerSpinner';
import { baseURL } from '../../Config';

const UpdateProfile = ({ getProfileById, allUsers, onHide }) => {

    console.log("allUsers", allUsers)
    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);

    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required."),
        email: Yup.string().email("Invalid email format.").required("This field is required."),
        password: Yup.string().required("This field is required."),

    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            username: "",
            email: "",
            password: "",


        },

        onSubmit: async (data) => {

            setSaveBtnLoading(true);
            const obj = {
                username: formik.values.username,
                email: formik.values.email,
                password: formik.values.password,
                Image: selectedFiles[0]?.base64,
            }

            const response = await dispatch(handlePutRequest(obj, `/api/user/update/${allUsers?._id}`, true, true));
            console.log("response", response)
            if (response?.status == 200) {
                onHide()
                await getProfileById()
                getProfileById()
            }
            setSaveBtnLoading(false)
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

        if (allUsers) {
            formik.setFieldValue("username", allUsers?.username)
            formik.setFieldValue("email", allUsers?.email)
            // formik.setFieldValue("password", allUsers?.password)
        }
    }, [allUsers])

    return (

        <>

            {saveBtnLoading ? (
                <CustomerSpinner />
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
                                src={selectedFiles?.length === 0 ? `${baseURL}/${allUsers?.image}` : selectedFiles?.length ? selectedFiles[0]?.base64 : `data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61 61" width="100px" height="100px">
      <path d="M48.2917 12.7083V48.2917H12.7083V12.7083H48.2917ZM48.2917 7.625H12.7083C9.9125 7.625 7.625 9.9125 7.625 12.7083V48.2917C7.625 51.0875 9.9125 53.375 12.7083 53.375H48.2917C51.0875 53.375 53.375 51.0875 53.375 48.2917V12.7083C53.375 9.9125 51.0875 7.625 48.2917 7.625ZM35.9392 30.1442L28.3142 39.9804L22.875 33.3975L15.25 43.2083H45.75L35.9392 30.1442Z" fill="black" fill-opacity="0.4"/>
    </svg>
  `}
                                width="100px" height="100px"
                                alt="Profile Image"
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
                            <InputText placeholder='Enter User Name' className="p-inputtext-sm" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} type="text" />
                            {getFormErrorMessage("username")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter Email' className="p-inputtext-sm" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} type="email" />
                            {getFormErrorMessage("email")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText type='password' toggleMask placeholder='Enter your password' id='password' name="password" value={formik.values.password} onChange={formik.handleChange} className="p-inputtext-sm" autoComplete="off" />
                            {getFormErrorMessage("password")}
                        </div>

                        <div className='col-12 text-center mt-4 pb-2'>
                            <Button className="Save-Button w-3 ml-2" label="Edit Profile" type="submit" />
                        </div>

                    </div>
                </form>

            </LoadingOverlay>
        </>
    )
}

export default UpdateProfile