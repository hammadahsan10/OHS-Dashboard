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

const OTP = () => {

    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const validationSchema = Yup.object().shape({
        email: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            email: "",
        },

        onSubmit: async (data) => {

            setSaveBtnLoading(true);
            const response = await dispatch(handlePostRequest(data, "/api/user/sendOtp", false, true));
            
            if (response?.status !== 500 && response?.status !== 400) 
            {
                history.push("/signup");
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
        history.push("/resetpassword")
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
                        <h3 style={{color:"white", fontWeight:"350", fontSize:"24px"}}>Maximizing your human resource potential through the science of behavior.</h3>
                    </div>
                </div>

                <div className="right-section">
                    <form onSubmit={formik.handleSubmit} className="login-form">
                        <h1 className="mb-2 text-center" style={{ color: "black", letterSpacing: "1px", fontWeight: "500" }}> Send OTP through Email </h1>
                        <h5 className="mb-2 text-center" style={{ color: "gray", letterSpacing: "1px", fontWeight: "400" }}> Please enter your email address, and we'll initiate a Sign Up process for you. </h5>
                        <div className="login-div text-center mt-6">
                            <InputText placeholder="Enter your email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} type="email" autoComplete="off" className="p-inputtext-sm md:col-10 mb-5" />
                            {getFormErrorMessage("email")}
                           
                            <div className='col-12 text-center'>
                                <Button className="Save-Button w-6 mt-5" label="Continue" loading={saveBtnLoading} type="submit" />
                            </div>
                            <div className="mt-4" >
                                <h6 style={{  cursor: "pointer", color:"#009bcb" }} className="mb-3" onClick={RouteTo}> Check your email for OTP.</h6>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default OTP;
