import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import LoadingOverlay from 'react-loading-overlay';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { FileUpload } from 'primereact/fileupload';
import img from "../../../assets/jswall_assets/JS WALL/login1.png"
import { handlePostRequest } from '../../../services/PostTemplate';
import { baseURL } from '../../../Config';
import { handlePutRequest } from '../../../services/PutTemplate';
import { CustomerSpinner } from '../../../components/CustomerSpinner';

const AddEditManagers = ({ companyId, rowObject, onHide, editable, getManagersByCompany }) => {

    console.log("rowObject", rowObject)
    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [allDepartments, setAllDepartments] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);

    const history = useHistory()
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required."),
        email: Yup.string().email("Invalid email format.").required("This field is required."),
        department: Yup.string().required("This field is required."),
        jobTitle: Yup.string().required("This field is required."),
        password: editable  ? null : Yup.string().required("This field is required."),
        confirmPassword: editable ? null : Yup.string()
            .required("This field is required.")
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            username: "",
            email: "",
            department: "",
            jobTitle: "",
            confirmPassword: "",
            password: "",

        },

        onSubmit: async (data) => {

            if (editable) {
                setSaveBtnLoading(true);
                const obj = {
                    username: formik.values.username,
                    email: formik.values.email,
                    department: formik.values.department,
                    confirmPassword: formik.values.confirmPassword,
                    password: formik.values.password,
                    jobTitle: formik.values.jobTitle,
                    Image: selectedFiles[0]?.base64,
                    company: companyId
                }

                const response = await dispatch(handlePutRequest(obj, `/api/user/update/${rowObject?._id}`, true, true));
                console.log("response", response)
                if (response?.status == 200) {
                    onHide()
                    await getManagersByCompany()
                    getManagersByCompany()
                }
                setSaveBtnLoading(false)
            }

            else {

                setSaveBtnLoading(true);
                const obj = {
                    username: formik.values.username,
                    email: formik.values.email,
                    department: formik.values.department,
                    confirmPassword: formik.values.confirmPassword,
                    password: formik.values.password,
                    jobTitle: formik.values.jobTitle,
                    Image: selectedFiles[0]?.base64,
                    company: companyId
                }

                const response = await dispatch(handlePostRequest(obj, "/api/user/ManagerSignUp", true, true));
                if (response) {
                    onHide()
                    await getManagersByCompany()
                    getManagersByCompany()
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
            formik.setFieldValue("username", rowObject?.username)
            formik.setFieldValue("email", rowObject?.email)
            formik.setFieldValue("department", rowObject?.department)
            formik.setFieldValue("jobTitle", rowObject?.jobTitle)
        }
    }, [editable, rowObject])

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
                                src={editable && selectedFiles?.length === 0 ? `${baseURL}/${rowObject?.image}` : editable && selectedFiles?.length ? selectedFiles[0]?.base64 : selectedFiles?.length ? selectedFiles[0]?.base64 : `data:image/svg+xml,
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
                            <InputText placeholder='Enter Manager Name' className="p-inputtext-sm" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} type="text" />
                            {getFormErrorMessage("username")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter Email' className="p-inputtext-sm" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} type="email" />
                            {getFormErrorMessage("email")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter Dept Name' id="department" name="department" value={formik.values.department} onChange={formik.handleChange} type="text" className="p-inputtext-sm"></InputText>
                            {getFormErrorMessage("department")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter Job Title' id="jobTitle" name="jobTitle" value={formik.values.jobTitle} onChange={formik.handleChange} className="p-inputtext-sm"></InputText>
                            {getFormErrorMessage("jobTitle")}
                        </div>

                        {editable ?
                            null
                            :
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <InputText type='password' toggleMask placeholder='Enter your password' id='password' name="password" value={formik.values.password} onChange={formik.handleChange} className="p-inputtext-sm" autoComplete="off" />
                                {getFormErrorMessage("password")}
                            </div>
                        }

                        {editable ?
                            null
                            :
                            <div className="field col-12 md:col-6 pl-6 pr-6">
                                <InputText type='password' toggleMask placeholder='Enter your Confirm Password' id='confirmPassword' name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} className="p-inputtext-sm" autoComplete="off" />
                                {getFormErrorMessage("confirmPassword")}
                            </div>
                            
                            }

                        <div className='col-12 text-center mt-4 pb-2'>
                            <Button className="Save-Button w-3 ml-2" label={editable ? "Edit Manager" : "Add Manager"} type="submit" />
                        </div>

                    </div>
                </form>

            </LoadingOverlay>
        </>
    )
}

export default AddEditManagers