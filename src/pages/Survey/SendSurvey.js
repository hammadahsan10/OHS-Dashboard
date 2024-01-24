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
import { InputTextarea } from 'primereact/inputtextarea';
import { handlePostRequest } from '../../services/PostTemplate';
import { CustomerSpinner } from '../../components/CustomerSpinner';
import { handleGetRequest } from '../../services/GetTemplate';

const SendSurvey = ({ surveyObj }) => {

    console.log("surveyObj", surveyObj)

    const userId = localStorage.getItem("userId")
    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [allCompanies, setAllCompanies] = useState([])

    const history = useHistory()
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        email: Yup.mixed().required("This field is required."),
        description: Yup.mixed().required("This field is required."),
        company: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            email: "",
            description: "",
            company: "",
        },

        onSubmit: async (data) => {
            setSaveBtnLoading(true);

            const filteredSurveyObj = [surveyObj]?.map(item => {
                const { _id, __v, ...rest } = item;
                return rest;
            });
            
            const obj = {
                data: filteredSurveyObj[0],
                email: formik.values.email,
                company: formik.values.company,
                description: formik.values.description,
            }
            console.log("obj", obj)
            
            
            const response = await dispatch(handlePostRequest(obj, `/api/user/sendOtp`, true, true));
            if (response) {
            }
            setSaveBtnLoading(false)
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    //Get All Users
    const getCompanyList = async () => {

        setIsActive(true);

        const response = await dispatch(handleGetRequest("/api/company/getAll", true));
        if (response) {
            setAllCompanies(response?.data);
        }
        setIsActive(false);
    };

    useEffect(() => {
        getCompanyList()
    }, [])

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
                    <div className="p-fluid formgrid grid pl-5 pr-5 flex-row">

                    <div className='flex flex-column col-12'>
                            <label className='ml-3' style={{ fontWeight: "bold", color: "black" }}> Add Company</label>
                            <div className="field col-12 md:col-12 pl-3 pr-3 mt-2">
                                <Dropdown options={allCompanies} optionLabel='companyName' filter filterBy='companyName' optionValue='_id' placeholder='Select Your Company' className="p-inputtext-sm" id="company" name="company" value={formik.values.company} onChange={formik.handleChange}  />
                                {getFormErrorMessage("company")}
                            </div>
                        </div>
                        <div className='flex flex-column col-12'>
                            <label className='ml-3' style={{ fontWeight: "bold", color: "black" }}> Add Email</label>
                            <div className="field col-12 md:col-12 pl-3 pr-3 mt-2">
                                <InputText placeholder='Enter your Email' className="p-inputtext-sm" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} type="email" />
                                {getFormErrorMessage("email")}
                            </div>
                        </div>

                        <div className=' flex flex-column col-12 mt-3'>
                            <label className='ml-3' style={{ fontWeight: "bold", color: "black" }}> Add description </label>
                            <div className="field col-12 md:col-12 pl-3 pr-3 mt-2">
                                <InputTextarea rows={12} cols={10} placeholder='Add Description' className="p-inputtext-sm" id="description" name="description" value={formik.values.description} onChange={formik.handleChange} type="text" />
                                {getFormErrorMessage("description")}
                            </div>
                        </div>

                        <div className='col-12 text-center mt-4 pb-2'>
                            <Button className="Save-Button w-3 ml-2" label="Send" type="submit" />
                        </div>

                    </div>
                </form>

            </LoadingOverlay>
        </>
    )
}

export default SendSurvey