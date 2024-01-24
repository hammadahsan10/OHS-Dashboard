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
    const [viewPersonalFields6, setViewPersonalFields6] = useState(false);
    const [viewPersonalFields7, setViewPersonalFields7] = useState(false);
    const [viewPersonalFields8, setViewPersonalFields8] = useState(false);

    const validationSchema = Yup.object().shape({

    });

    const formik = useFormik({

        // validationSchema: validationSchema,
        initialValues: {

            //Personal Information
            key1: "Full Name",
            key2: "Role",
            key3: "Coaches Name",
            key4: "Employment Date",
            key5: "Manager Name",
            key6: "Current AUM",
            key7: "Number of Clients",
            key8: "Top Strengths",

            // Top 5 Strengths
            key9: "Strength 1",
            key10: "Mismanagement 1",
            key11: "Strength 2",
            key12: "Mismanagement 2",

            // Top Growth Goals 
            key13: "Growth Goal 1",
            key14: "Comment 1",
            key15: "Growth Goal 2",
            key16: "Comment 2",

            // Add new 3 Goals
            key17: "Growth Goal 6",
            key18: "Growth Goal 7",
            key19: "Growth Goal 8",

            // Top 5 Opportunities
            key20: "Opportunity 1",
            key21: "Comment 1",
            key22: "Opportunity 2",
            key23: "Comment 2",

            // Add new 3 Opportunity
            key24: "Opportunity 6",
            key25: "Opportunity 7",
            key26: "Opportunity 8",

            // Top 5 Holistic
            key27: "Spirtual 1",
            key28: "Physical Health 1",
            key29: "Spirtual 2",
            key30: "Physical Health 2",

            // 3 Achivements
            key31: "Current Challenge",
            key32: "Biggest Challenge",
            key33: "Biggest Win",
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
                setViewPersonalFields6(false)
                setViewPersonalFields7(false)
                setViewPersonalFields8(false)
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

    const handleChevron6 = () => {
        if (viewPersonalFields6 == false) {
            setViewPersonalFields6(true)
        }
        else {

            setViewPersonalFields6(false)
        }
    }

    const handleChevron7 = () => {
        if (viewPersonalFields7 == false) {
            setViewPersonalFields7(true)
        }
        else {

            setViewPersonalFields7(false)
        }
    }

    const handleChevron8 = () => {
        if (viewPersonalFields8 == false) {
            setViewPersonalFields8(true)
        }
        else {

            setViewPersonalFields8(false)
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

                {/* Personal Information */}
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
                                </div>

                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key2" name="key2" value={formik.values.key2} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key3" name="key3" value={formik.values.key3} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key4" name="key4" value={formik.values.key4} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key5" name="key5" value={formik.values.key5} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key6" name="key6" value={formik.values.key6} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key7" name="key7" value={formik.values.key7} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 pl-6 pr-4">
                                    <div className='flex flex-row'>
                                        <InputText className="p-inputtext-sm label-style" id="key8" name="key8" value={formik.values.key8} onChange={formik.handleChange} type="text" />
                                        <i className="pi pi-pencil mt-3 mr-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}

                </div>

                {/* Top 5 Strengths */}
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
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key10" name="key10" value={formik.values.key10} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key11" name="key11" value={formik.values.key11} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key12" name="key12" value={formik.values.key12} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                        </div>
                        : null}

                </div>

                {/* Top 5 Growth Goals */}
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
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key14" name="key14" value={formik.values.key14} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key15" name="key15" value={formik.values.key15} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key16" name="key16" value={formik.values.key16} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                        </div>
                        : null}

                </div>

                {/* Add 3 new goals growth */}
                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Add New Growths Goals</h5>
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
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key18" name="key18" value={formik.values.key18} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key19" name="key19" value={formik.values.key19} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                        </div>
                        : null}

                </div>

                {/* Top 5 Opportunities */}
                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Top 5 Opportunities</h5>
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
                                    <InputText className="p-inputtext-sm label-style" id="key20" name="key20" value={formik.values.key20} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key21" name="key21" value={formik.values.key21} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key22" name="key22" value={formik.values.key22} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key23" name="key23" value={formik.values.key23} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>

                        </div>
                        : null}

                </div>

                {/* Add 3 new Opportunities */}
                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Add 3 New Opportunities</h5>
                        </div>
                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ml-4">
                                <Button
                                    style={{ border: "none", background: "transparent", color: 'gray' }}
                                    type="button"
                                    label={
                                        <>
                                            <i className={viewPersonalFields6 ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                        </>
                                    }
                                    onClick={() => {
                                        handleChevron6();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {viewPersonalFields6 ?
                        <div className="p-fluid formgrid grid pl-5 pr-5">

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key24" name="key24" value={formik.values.key24} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key25" name="key25" value={formik.values.key25} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key26" name="key26" value={formik.values.key26} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>

                        </div>
                        : null}

                </div>

                {/* Add 5 Holistic */}
                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Top 5 Holistic Life Goals</h5>
                        </div>
                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ml-4">
                                <Button
                                    style={{ border: "none", background: "transparent", color: 'gray' }}
                                    type="button"
                                    label={
                                        <>
                                            <i className={viewPersonalFields7 ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                        </>
                                    }
                                    onClick={() => {
                                        handleChevron7();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {viewPersonalFields7 ?
                        <div className="p-fluid formgrid grid pl-5 pr-5">

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key27" name="key27" value={formik.values.key27} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key28" name="key28" value={formik.values.key28} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key29" name="key29" value={formik.values.key29} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key30" name="key30" value={formik.values.key30} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>

                        </div>
                        : null}

                </div>

                {/* 3 Achievements */}
                <div>
                    <div className="scroll-container card flex justify-content-between mt-4">
                        <div className="flex flex-row" style={{ alignItems: "center" }}>
                            <h5 style={{ color: 'black' }} className="ml-6">Achievements</h5>
                        </div>
                        <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ml-4">
                                <Button
                                    style={{ border: "none", background: "transparent", color: 'gray' }}
                                    type="button"
                                    label={
                                        <>
                                            <i className={viewPersonalFields8 ? "pi pi-chevron-up" : "pi pi-chevron-down"} style={{ marginLeft: '4px' }} />
                                        </>
                                    }
                                    onClick={() => {
                                        handleChevron8();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {viewPersonalFields8 ?
                        <div className="p-fluid formgrid grid pl-5 pr-5">

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key31" name="key31" value={formik.values.key31} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>

                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key32" name="key32" value={formik.values.key32} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
                            </div>
                            <div className="field col-12 md:col-4 pl-6 pr-4">
                                <div className='flex flex-row'>
                                    <InputText className="p-inputtext-sm label-style" id="key33" name="key33" value={formik.values.key33} onChange={formik.handleChange} type="text" />
                                    <i className="pi pi-pencil mt-3 mr-5" />
                                </div>
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