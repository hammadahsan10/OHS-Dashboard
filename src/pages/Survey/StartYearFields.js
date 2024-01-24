import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { handlePutRequest } from '../../services/PutTemplate';
import { handleGetRequest } from '../../services/GetTemplate';
import { CustomerSpinner } from '../../components/CustomerSpinner';

const StartYearFields = () => {

    const location = useLocation();
    const myData = location.state?.additionalProp;
    console.log("myData", myData)

    const history = useHistory()
    const dispatch = useDispatch()
    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [viewPersonalFields1, setViewPersonalFields1] = useState(false);
    const [viewPersonalFields2, setViewPersonalFields2] = useState(false);
    const [viewPersonalFields3, setViewPersonalFields3] = useState(false);
    const [viewPersonalFields4, setViewPersonalFields4] = useState(false);
    const [viewPersonalFields5, setViewPersonalFields5] = useState(false);

    const validationSchema = Yup.object().shape({
        key1: Yup.mixed().required("This field is required."),
        key2: Yup.mixed().required("This field is required."),
        key3: Yup.mixed().required("This field is required."),
        key4: Yup.mixed().required("This field is required."),
        key5: Yup.mixed().required("This field is required."),
        key6: Yup.mixed().required("This field is required."),
        key7: Yup.mixed().required("This field is required."),
        key8: Yup.mixed().required("This field is required."),
        key9: Yup.mixed().required("This field is required."),
        key10: Yup.mixed().required("This field is required."),
        key11: Yup.mixed().required("This field is required."),
        key12: Yup.mixed().required("This field is required."),
        key13: Yup.mixed().required("This field is required."),
        key14: Yup.mixed().required("This field is required."),
        key15: Yup.mixed().required("This field is required."),
        key16: Yup.mixed().required("This field is required."),
        key17: Yup.mixed().required("This field is required."),
        key18: Yup.mixed().required("This field is required."),
        key19: Yup.mixed().required("This field is required."),
        key20: Yup.mixed().required("This field is required."),
        key21: Yup.mixed().required("This field is required."),
        key22: Yup.mixed().required("This field is required."),
        key23: Yup.mixed().required("This field is required."),
        key24: Yup.mixed().required("This field is required."),
        key25: Yup.mixed().required("This field is required."),
        key26: Yup.mixed().required("This field is required."),
        key27: Yup.mixed().required("This field is required."),
        key28: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {

            //Personal Information
            key1: "Full Name",
            key2: "Role",
            key3: "Coaches Name",
            key4: "Managers Name",
            key5: "Employment Date",
            key6: "Current AUM",
            key7: "Number of Clients",
            key8: "Top Strengths",

            // Top 5 Strengths
            key9: "Strength 1",
            key10: "Mismanagement 1",
            key11: "Strength 2",
            key12: "Mismanagement 2",

            // Top 5 Goals
            key13: "Goal 1",
            key14: "Goal 2",
            key15: "Goal 3",
            key16: "Goal 4",

            // Top 5 Opportunities
            key17: "Opportunity 1",
            key18: "Opportunity 2",
            key19: "Opportunity 3",
            key20: "Opportunity 4",

            // Holistic Life Goals
            key21: "Spiritual",
            key22: "Intellectual",
            key23: "Phsical Health",
            key24: "Family Relationship",
            key25: "Financial Wealth",
            key26: "Social Investment",
            key27: "Rest and Restoration",
            key28: "Long Term Goals/ Career Paths",
        },

        onSubmit: async (data) => {

            setSaveBtnLoading(true);

            data["Name"] = myData?.Name;
            console.log("data", data)

            const response = await dispatch(handlePutRequest(data, `/api/survey/update/${myData?._id}`, true, true));
            if (response) {
                setViewPersonalFields1(false)
                setViewPersonalFields2(false)
                setViewPersonalFields3(false)
                setViewPersonalFields4(false)
                setViewPersonalFields5(false)
                getKeysBySurveryId()

            }
            setSaveBtnLoading(false)
        }

    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleChevron1 = () => {
        if (viewPersonalFields1 == false) {
            setViewPersonalFields1(true)
        }
        else {

            setViewPersonalFields1(false)
        }
    }

    const handleChevron2 = () => {
        if (viewPersonalFields2 == false) {
            setViewPersonalFields2(true)
        }
        else {

            setViewPersonalFields2(false)
        }
    }

    const handleChevron3 = () => {
        if (viewPersonalFields3 == false) {
            setViewPersonalFields3(true)
        }
        else {

            setViewPersonalFields3(false)
        }
    }

    const handleChevron4 = () => {
        if (viewPersonalFields4 == false) {
            setViewPersonalFields4(true)
        }
        else {

            setViewPersonalFields4(false)
        }
    }

    const handleChevron5 = () => {
        if (viewPersonalFields5 == false) {
            setViewPersonalFields5(true)
        }
        else {

            setViewPersonalFields5(false)
        }
    }

    const getKeysBySurveryId = async () => {

        const response = await dispatch(handleGetRequest(`/api/survey/getById/${myData?._id}`, true));
        const keyData = response?.data;

        if (keyData) {
            const keysToMap = Object.keys(keyData).filter(key => key !== 'Name' && key !== "_id" && key !== '__v');
            keysToMap.forEach(key => {
                formik.setFieldValue(key, keyData[key]);
            });
        }

    }
    useEffect(() => {
        if (myData) {
            getKeysBySurveryId()
        }
    }, [myData])

    return (

        <>
            {saveBtnLoading ? (
                <CustomerSpinner />
            ) : (
                null
            )}

            <div className="card flex justify-content-between">
                <h2 style={{ fontWeight: "700", color: 'black', letterSpacing: "1px" }}>{myData?.Name} - 2024</h2>
            </div>

            <br />
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className="scroll-container card flex justify-content-between">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Personal Information</h5>
                        </div>
                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ml-4">
                                <Button
                                    style={{ border: "none", background: "transparent", color: 'gray' }}
                                    type="button"
                                    label={
                                        <>
                                            <i className={viewPersonalFields1 ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                        </>
                                    }
                                    onClick={() => {
                                        handleChevron1();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {viewPersonalFields1 ?
                        <div className='' style={{ color: "black" }}>
                            <div className="p-fluid formgrid grid pl-5 pr-5">

                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key1" name="key1" value={formik.values.key1} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                    {getFormErrorMessage("key1")}
                                </div>

                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key2" name="key2" value={formik.values.key2} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                    {getFormErrorMessage("key2")}
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key3" name="key3" value={formik.values.key3} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                    {getFormErrorMessage("key3")}
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key4" name="key4" value={formik.values.key4} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                    {getFormErrorMessage("key4")}
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key5" name="key5" value={formik.values.key5} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                    {getFormErrorMessage("key5")}
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key6" name="key6" value={formik.values.key6} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                    {getFormErrorMessage("key6")}
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key7" name="key7" value={formik.values.key7} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                    {getFormErrorMessage("key7")}
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key8" name="key8" value={formik.values.key8} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                    {getFormErrorMessage("key8")}
                                </div>
                            </div>
                        </div>
                        : null}

                </div>

                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Top 5 Strengths</h5>
                        </div>
                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ml-4">
                                <Button
                                    style={{ border: "none", background: "transparent", color: 'gray' }}
                                    type="button"
                                    label={
                                        <>
                                            <i className={viewPersonalFields2 ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                        </>
                                    }
                                    onClick={() => {
                                        handleChevron2();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {viewPersonalFields2 ?
                        <div className="p-fluid formgrid grid pl-5 pr-5">

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key9" name="key9" value={formik.values.key9} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key9")}
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key10" name="key10" value={formik.values.key10} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key10")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key11" name="key11" value={formik.values.key11} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key11")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key12" name="key12" value={formik.values.key12} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key12")}
                            </div>
                        </div>
                        : null}

                </div>

                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Goals for Growths</h5>
                        </div>
                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ml-4">
                                <Button
                                    style={{ border: "none", background: "transparent", color: 'gray' }}
                                    type="button"
                                    label={
                                        <>
                                            <i className={viewPersonalFields3 ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                        </>
                                    }
                                    onClick={() => {
                                        handleChevron3();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {viewPersonalFields3 ?
                        <div className="p-fluid formgrid grid pl-5 pr-5">

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key13" name="key13" value={formik.values.key13} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key13")}
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key14" name="key14" value={formik.values.key14} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key14")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key15" name="key15" value={formik.values.key15} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key15")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key16" name="key16" value={formik.values.key16} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key16")}
                            </div>
                        </div>
                        : null}

                </div>

                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Opportunities for Growths</h5>
                        </div>
                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ml-4">
                                <Button
                                    style={{ border: "none", background: "transparent", color: 'gray' }}
                                    type="button"
                                    label={
                                        <>
                                            <i className={viewPersonalFields4 ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                        </>
                                    }
                                    onClick={() => {
                                        handleChevron4();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {viewPersonalFields4 ?
                        <div className="p-fluid formgrid grid pl-5 pr-5">

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key17" name="key17" value={formik.values.key17} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key17")}
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key18" name="key18" value={formik.values.key18} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key18")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key19" name="key19" value={formik.values.key19} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key19")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key20" name="key20" value={formik.values.key20} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key20")}
                            </div>
                        </div>
                        : null}

                </div>

                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Holistic Life Goals</h5>
                        </div>
                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ml-4">
                                <Button
                                    style={{ border: "none", background: "transparent", color: 'gray' }}
                                    type="button"
                                    label={
                                        <>
                                            <i className={viewPersonalFields5 ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                        </>
                                    }
                                    onClick={() => {
                                        handleChevron5();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {viewPersonalFields5 ?
                        <div className="p-fluid formgrid grid pl-5 pr-5">

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key21" name="key21" value={formik.values.key21} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key21")}
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key22" name="key22" value={formik.values.key22} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key22")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key23" name="key23" value={formik.values.key23} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key23")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key24" name="key24" value={formik.values.key24} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key24")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key25" name="key25" value={formik.values.key25} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key25")}
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key26" name="key26" value={formik.values.key26} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key26")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key27" name="key27" value={formik.values.key27} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key27")}
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key28" name="key28" value={formik.values.key28} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                                {getFormErrorMessage("key28")}
                            </div>

                        </div>
                        : null}

                </div>
                <div className='col-12 text-center mt-4 pb-2'>
                    <Button className="Save-Button w-3 ml-2" label="Update Fields" type="submit" />
                </div>
            </form>



        </>
    );
};

export default StartYearFields