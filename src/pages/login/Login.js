import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { handlePostRequest } from "../../services/PostTemplate";
import { useDispatch } from "react-redux";
import logo from "../../assets/ohs-assets/OHS.png"

const Login = () => {

    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const validationSchema = Yup.object().shape({
        email: Yup.mixed().required("This field is required."),
        password: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            email: "",
            password: "",
        },

        onSubmit: async (data) => {

            setSaveBtnLoading(true);
            const response = await dispatch(handlePostRequest(data, "/api/user/Login", false, true));
            console.log("login response: ", response)
            if (response?.auth == true) {
                localStorage.setItem("login", true)
                localStorage.setItem("username", response?.data?.username)
                localStorage.setItem("role_Name", response?.data?.role?.role_Name)
                localStorage.setItem("companyId", response?.data?.company?._id)
                localStorage.setItem("userId", response?.data?._id)
                localStorage.setItem("dp", response?.data?.image)
                history.push("/home");
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

    const RouteTo = () => {
        history.push("/forgotpassword")
    }

    const RouteTo2 = () => {
        history.push("/otp")
    }

    useEffect(() => {
        return () => {
            setSaveBtnLoading(false);
        };
    }, []);

    useEffect(() => {
        if (formik.values.email) {
            localStorage.setItem("EmailForForgotPass", formik.values.email)
        }
    }, [formik.values.email])

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
                        <h1 className="mb-2 text-center" style={{ color: "black", letterSpacing: "1px", fontWeight: "500" }}> Hey, Welcome ! </h1>
                        <h5 className="mb-2 text-center" style={{ color: "gray", letterSpacing: "1px", fontWeight: "400", }}> Sign in to continue </h5>
                        <div className="login-div text-center mt-6">
                            <div className='flex-column'>
                                <InputText
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    type="email"
                                    autoComplete="off"
                                    className="p-inputtext-sm md:col-10"
                                />
                                <span className="text-left"> {getFormErrorMessage("email")} </span>
                            </div>
                            <div className='flex-column mt-5'>
                                <InputText
                                    type="password"
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    toggleMask
                                    autoComplete="off"
                                    className="p-inputtext-sm md:col-10"
                                />
                                <span className="text-left"> {getFormErrorMessage("password")} </span>
                            </div>
                            <div className="mt-4" >
                                <h6 style={{ color: "gray", cursor: "pointer" }} onClick={RouteTo}> Forgot Password ?</h6>
                            </div>
                            <div className='col-12 text-center'>
                                <Button className="Save-Button w-6 mt-5" label="Sign in" loading={saveBtnLoading} type="submit" />
                            </div>
                            <div className="mt-4" >
                                <h6 style={{ color: "gray", cursor: "pointer" }} className="mb-3"> Don't have an account ? <span style={{ fontWeight: "bold" }} onClick={RouteTo2}>Register</span></h6>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default Login;
