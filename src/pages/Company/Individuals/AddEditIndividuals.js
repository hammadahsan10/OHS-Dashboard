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
import { handlePutRequest } from '../../../services/PutTemplate';
import { handlePostRequest } from '../../../services/PostTemplate';
import { baseURL } from '../../../Config';
import { CustomerSpinner } from '../../../components/CustomerSpinner';

const AddEditIndividuals = ({ onHide, editable, rowObject, getIndividualsByCompany, companyId }) => {

    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [allDepartments, setAllDepartments] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);

    console.log("rowObject indi", rowObject)
    const history = useHistory()
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        username: Yup.mixed().required("This field is required."),
        email: Yup.mixed().required("This field is required."),
    });

    const formik = useFormik({

        validationSchema: validationSchema,
        initialValues: {
            username: "",
            email: "",
        },

        onSubmit: async (data) => {

            if (editable) {

                setSaveBtnLoading(true);

                const obj = {
                    username: formik.values.username,
                    email: formik.values.email,
                    Image: selectedFiles?.length ? selectedFiles[0]?.base64 : null,
                    companyId: companyId
                }

                console.log("obj", obj)

                const response = await dispatch(handlePutRequest(obj, `/api/user/update/${rowObject?._id}`, true, true));
                console.log("response", response)
                if (response?.status == 200) {
                    onHide()
                    await getIndividualsByCompany()
                }
                setSaveBtnLoading(false)
            }

            else {

                const obj = {
                    // companyName: formik.values.companyName,
                    // description: formik.values.description,
                    // phoneNo: formik.values.phoneNo,
                    // address: formik.values.address,
                    // logo: selectedFiles[0]?.base64,
                }

                setSaveBtnLoading(true);
                const response = await dispatch(handlePostRequest(obj, "/api/company/create", true, true));
                if (response?.status == 200) {
                    onHide()
                    await getIndividualsByCompany()
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

    console.log("selectedFiles", selectedFiles)

    useEffect(() => {

        if (rowObject && editable) {
            console.log("rowObject", rowObject)
            formik.setFieldValue("username", rowObject?.username)
            formik.setFieldValue("email", rowObject?.email)
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
                                src={selectedFiles?.length ? selectedFiles[0]?.base64 : `${baseURL}/${rowObject?.image}`}
                                width="100px" height="100px"
                                alt="logo Image"
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
                            <InputText placeholder='Enter Name' className="p-inputtext-sm" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} type="text" />
                            {getFormErrorMessage("username")}
                        </div>

                        <div className="field col-12 md:col-6 pl-6 pr-6">
                            <InputText placeholder='Enter description' className="p-inputtext-sm" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} type="email" />
                            {getFormErrorMessage("email")}
                        </div>

                        <div className='col-12 text-center mt-4 pb-2'>
                            <Button className="Save-Button w-3 ml-2" label={editable ? "Edit Individual" : "Add Individual"} type="submit" />
                        </div>

                    </div>
                </form>

            </LoadingOverlay>
        </>
    )
}

export default AddEditIndividuals