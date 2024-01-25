import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { handlePostRequest } from "../../services/PostTemplate";
import { useDispatch } from "react-redux";
import logo from "../../assets/ohs-assets/OHS.png"
import { FileUpload } from "primereact/fileupload";

const SignUp = () => {

    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()

    const validationSchema = Yup.object().shape({

        username: Yup.mixed().required("This field is required."),
        email: Yup.mixed().required("This field is required."),
        // department: Yup.mixed().required("This field is required."),
        // jobTitle: Yup.mixed().required("This field is required."),
        password: Yup.string().required("This field is required."),
        confirmPassword: Yup.string()
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
            password: "",
            confirmPassword: "",
        },

        onSubmit: async (data) => {

            setSaveBtnLoading(true);
            const obj = {
                username: formik.values.username,
                email: formik.values.email,
                // department: formik.values.department,
                // jobTitle: formik.values.jobTitle,
                password: formik.values.password,
                confirmPassword: formik.values.confirmPassword,
                Image: selectedFiles[0]?.base64,
            }
            const response = await dispatch(handlePostRequest(obj, "/api/user/SignUp", false, true));
            console.log("res signup", response)
            if (response?.status == 200) {
                history.push("/");
                setSaveBtnLoading(false)
            }
            else {
                setSaveBtnLoading(false)
            }
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const RouteTo2 = () => {
        history.push("/login")
    }

    useEffect(() => {
        return () => {
            setSaveBtnLoading(false);
        };
    }, []);

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

    console.log("selectedFiles", selectedFiles)

    return (

        <>
            <div className="login-page-container">
                <div className="left-section">
                    <div className="imgMainLogo" />
                    <img src={logo} className="imgAppLogo" width="400px" height="400px" />
                    <div className="text-center textAppLogo" >
                        <h3 style={{ color: "white", fontWeight: "350", fontSize: "24px" }}>Maximizing your human resource potential through the science of behavior.</h3>
                    </div>
                </div>

                <div className="right-section">
                    <form onSubmit={formik.handleSubmit} className="login-form">
                        <h1 className="mb-2 text-center" style={{ color: "black", letterSpacing: "1px", fontWeight: "500" }}> Sign up Account ! </h1>
                        <h5 className="mb-2 text-center" style={{ color: "gray", letterSpacing: "1px", fontWeight: "400", }}> Enter following information </h5>
                        <div className="login-div text-center mt-6">
                            <div className='flex-column'>
                                <img
                                    src={selectedFiles?.length ? selectedFiles[0]?.base64 : `data:image/svg+xml,
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

                            <div className="col-12 md:col-12 pl-2 pr-2">
                                <InputText
                                    placeholder="Enter your Name"
                                    id="username"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    type="text"
                                    className="p-inputtext-sm md:col-10"
                                />
                                <span className="flex pl-7">{getFormErrorMessage("username")}</span>
                            </div>
                            <div className="col-12 md:col-12 pl-2 pr-2">
                                <InputText
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    type="email"
                                    className="p-inputtext-sm md:col-10"
                                />
                                <span className="flex pl-7"> {getFormErrorMessage("email")} </span>
                            </div>

                            <div className="col-12 md:col-12 pl-2 pr-2">
                                <InputText
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    toggleMask
                                    type="password"
                                    className="p-inputtext-sm md:col-10"
                                />
                                <span className="flex pl-7"> {getFormErrorMessage("password")} </span>
                            </div>

                            <div className="col-12 md:col-12 pl-2 pr-2">
                                <InputText
                                    placeholder="Enter your confirmPassword"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    toggleMask
                                    type="password"
                                    className="p-inputtext-sm md:col-10"
                                />
                                <span className="flex pl-7"> {getFormErrorMessage("confirmPassword")} </span>
                            </div>

                            {/* <div className="col-12 md:col-12 pl-2 pr-2">
                                <InputText
                                    placeholder="Enter Job Title"
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={formik.values.jobTitle}
                                    onChange={formik.handleChange}
                                    type="text"
                                    className="p-inputtext-sm md:col-10"
                                />
                                <span className="flex pl-7"> {getFormErrorMessage("jobTitle")} </span>
                            </div>

                            <div className="col-12 md:col-12 pl-2 pr-2">
                                <InputText
                                    placeholder="Enter your Department"
                                    id="department"
                                    name="department"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    type="department"
                                    className="p-inputtext-sm md:col-10"
                                />
                                <span className="flex pl-7">
                                    {getFormErrorMessage("department")} </span>
                            </div> */}

                            <div className='col-12 text-center'>
                                <Button className="Save-Button w-6 mt-5" label="Sign up" loading={saveBtnLoading} type="submit" />
                            </div>
                            <div className="mt-4" >
                                <h6 style={{ color: "gray", cursor: "pointer" }} className="mb-3"> Already have an account ? <span style={{ fontWeight: "bold" }} onClick={RouteTo2}>Log In</span></h6>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default SignUp;
