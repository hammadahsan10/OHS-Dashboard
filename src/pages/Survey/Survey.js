import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import LoadingOverlay from "react-loading-overlay";
import { Triangle } from "react-loader-spinner";
import { handleGetRequest } from "../../services/GetTemplate";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SendSurvey from "./SendSurvey";
import { Badge } from "primereact/badge";

const Survey = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const currentYear = new Date().getFullYear();
    const role_Name = localStorage.getItem('role_Name')
    const userId = localStorage.getItem('userId')
    const companyId = localStorage.getItem('companyId')

    const [isActive, setIsActive] = useState(false)
    const [surveyObj, setSurveyObj] = useState();
    const [myData, setMyData] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [individualSurveyData, setIndividualSurveyData] = useState([]);
    const [allIndividualsSubmiitedSurvey, setAllIndividualsSubmiitedSurvey] = useState([]);

    const onHide = (name) => {
        setDisplayDialog(false);
    };

    const handleSendSurvey = (item) => {
        setSurveyObj(item)
        setDisplayDialog(true)
    };

    const handleViewSurvey = (item) => {

        if (item?.Name == 'Start of the Year Survey') {

            history.push({
                pathname: `./startyearfields`,
                state: { additionalProp: item }
            });
        }

        else if (item?.Name == 'Mid of the Year Survey') {

            history.push({
                pathname: `./midyearfields`,
                state: { additionalProp: item }
            });
        }

        else if (item?.Name == 'End of the Year Survey') {

            history.push({
                pathname: `./endyearfields`,
                state: { additionalProp: item }
            });
        }

        else {
            return null
        }

    };

    const handleViewSurveyForIndividual = (item) => {

        if (item?.Name == 'Start of the Year Survey') {

            history.push({
                pathname: `./startyearforms`,
                state: { additionalProp: item }
            });
        }

        else if (item?.Name == 'Mid of the Year Survey') {

            history.push({
                pathname: `./midyearforms`,
                state: { additionalProp: item }
            });
        }

        else if (item?.Name == 'End of the Year Survey') {

            history.push({
                pathname: `./endyearforms`,
                state: { additionalProp: item }
            });
        }

        else {
            return null
        }
    }

    const handleViewSurveyForManager = (item) => {

        if (item?.Name == 'Start of the Year Survey') {

            history.push({
                pathname: `./startyearforms`,
                state: { additionalProp: item }
            });
        }

        else if (item?.Name == 'Mid of the Year Survey') {

            history.push({
                pathname: `./midyearforms`,
                state: { additionalProp: item }
            });
        }

        else if (item?.Name == 'End of the Year Survey') {

            history.push({
                pathname: `./endyearforms`,
                state: { additionalProp: item }
            });
        }

        else {
            return null
        }
    }

    const handleViewSurveyForAdmin = (item) => {

        console.log("item", item)
        if (item?.Name == 'Start of the Year Survey') {

            history.push({
                pathname: `./startyearforms`,
                state: { additionalProp: item }
            });
        }

        else if (item?.Name == 'Mid of the Year Survey') {

            history.push({
                pathname: `./midyearforms`,
                state: { additionalProp: item }
            });
        }

        else if (item?.Name == 'End of the Year Survey') {

            history.push({
                pathname: `./endyearforms`,
                state: { additionalProp: item }
            });
        }
    }

    const Header = () => {
        return (
            <>
                <h3 className="text-center" style={{ fontWeight: "700" }}>Send Survery</h3>
            </>
        )
    }

    const getSurveyList = async () => {

        setIsActive(true);
        const response = await dispatch(handleGetRequest(`/api/survey/getAll`, true));
        if (response?.status == 200) {
            setMyData(response?.data);
        }
        setIsActive(false);
    };

    const getSubmittedSurveybyAllIndividuals = async () => {

        setIsActive(true);
        const response = await dispatch(handleGetRequest(`/api/userSurvey/getAll`, true));
        if (response) {
            setAllIndividualsSubmiitedSurvey(response);
        }
        setIsActive(false);
    };

    const getSurveyListByUserId = async () => {

        setIsActive(true);
        const response = await dispatch(handleGetRequest(`/api/userSurvey/getByUserId/${userId}`, true));
        console.log("res", response)
        if (response) {
            setMyData(response);
        }
        setIsActive(false);
    };

    const getSurveySubmittedByCompanyIndividuals = async () => {

        setIsActive(true);
        const response = await dispatch(handleGetRequest(`/api/user/GetManagerIndividualsByCompany/${companyId}`, true));
        if (response) {
            const surveysArray = response?.data?.map(user => user.surveys);

            // Flatten the array of arrays into a single array
            const flattenedSurveys = surveysArray.reduce((acc, surveys) => acc.concat(surveys), []);

            console.log("flattenedSurveys", flattenedSurveys);
            setIndividualSurveyData(flattenedSurveys);
        }
        setIsActive(false);
    };

    useEffect(() => {
        if (role_Name == 'Admin') {
            getSurveyList()
            getSubmittedSurveybyAllIndividuals()

        }
        else if (role_Name == 'Manager') {
            getSurveySubmittedByCompanyIndividuals()
        }
        else {
            getSurveyListByUserId()
        }
    }, [role_Name])

    return (
        <>

            <Dialog header={Header} visible={displayDialog} style={{ width: '45vw' }} onHide={onHide}>
                <SendSurvey
                    surveyObj={surveyObj}
                    onHide={onHide}
                    getSurveyList={getSurveyList}
                    getSubmittedSurveybyAllIndividuals={getSubmittedSurveybyAllIndividuals}
                />
            </Dialog>

            <div className="card flex justify-content-between">
                <h2 style={{ fontWeight: "700", color: 'black' }}>Surverys</h2>
            </div>

            {role_Name == "Admin" ?
                (
                    <>
                        <h3 style={{ color: "black", fontWeight: "bold" }} className="ml-2 mt-6">{currentYear}</h3>
                        <LoadingOverlay
                            active={isActive}
                            spinner={<Triangle
                                height="120"
                                width="120"
                                color="#009bcb"
                                ariaLabel="triangle-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />}

                            // text='Loading your content...'
                            styles={{
                                overlay: (base) => ({
                                    ...base,
                                    background: 'rgb(38 41 51 / 78%)',
                                })
                            }}
                        >
                            {myData?.map(item => {
                                return (
                                    <>
                                        <div key={item._id}>
                                            <div className="scroll-container card flex justify-content-between">
                                                <div className="flex flex-row" style={{ alignItems: "center" }}>
                                                    <h5 style={{ color: 'black' }} className="ml-6">{item?.Name}</h5>
                                                </div>
                                                <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="">
                                                        <Button
                                                            type="button"
                                                            label="Edit Fields"
                                                            className="View-Button"
                                                            onClick={() => {
                                                                handleViewSurvey(item);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <Button
                                                            type="button"
                                                            label="Send Survey"
                                                            className="ml-4 View-Button"
                                                            onClick={() => {
                                                                handleSendSurvey(item);
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                            <h4 style={{ color: "black", fontWeight: "700" }} className="ml-2 mt-6">Submitted Surverys</h4>
                            {allIndividualsSubmiitedSurvey?.map(item => {
                                return (
                                    <div key={item.id}>
                                        <div className="scroll-container card flex justify-content-between">
                                            <div className="flex flex-row">
                                                <div className="flex flex-row" style={{ alignItems: "center" }}>
                                                    <h5 style={{ color: 'black' }} className="ml-6">{item?.Name}</h5>
                                                </div>

                                                <div className="flex flex-row ml-6" style={{ alignItems: "center" }}>
                                                    <h6 style={{ color: 'black', fontSize: "15px", color: "#009bcb" }} className="ml-6 mt-2">(Submitted by {item?.userId?.username})</h6>
                                                </div>

                                                <div className="flex flex-row ml-5" style={{ alignItems: "center" }}>
                                                    <h5 style={{ color: 'black' }} className="ml-6"><Badge value={item?.status == 'pending' ? 'Pending' : 'Completed'} className={item?.status == 'pending' ? 'badge-pending mt-2' : 'badge-success mt-2'} ></Badge> </h5>
                                                </div>
                                            </div>

                                            <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                                                <Button
                                                    type="button"
                                                    label="View Survey"
                                                    className="Save-Button"
                                                    onClick={() => {
                                                        handleViewSurveyForAdmin(item);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </LoadingOverlay>
                    </>
                )
                : role_Name == "Manager" ? (
                    <>

                        <h3 style={{ color: "black", fontWeight: "bold" }} className="ml-2 mt-6">Survey Submitted Details</h3>
                        <h3 style={{ color: "black", fontWeight: "bold" }} className="ml-2 mt-2">{currentYear}</h3>
                        <LoadingOverlay
                            active={isActive}
                            spinner={<Triangle
                                height="120"
                                width="120"
                                color="#009bcb"
                                ariaLabel="triangle-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />}

                            // text='Loading your content...'
                            styles={{
                                overlay: (base) => ({
                                    ...base,
                                    background: 'rgb(38 41 51 / 78%)',
                                })
                            }}
                        >
                            {individualSurveyData && individualSurveyData?.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <div className="scroll-container card flex justify-content-between">
                                            <div className="flex flex-row">
                                                <div className="flex flex-row" style={{ alignItems: "center" }}>
                                                    <h5 style={{ color: 'black' }} className="ml-6">{item?.Name}</h5>
                                                </div>

                                                <div className="flex flex-row ml-6" style={{ alignItems: "center" }}>
                                                    <h6 style={{ color: 'black', fontSize: "15px", color: "#009bcb" }} className="ml-6 mt-2">(Submitted by {item?.userId?.username})</h6>
                                                </div>
                                            </div>

                                            <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                                                <Button
                                                    type="button"
                                                    label="View Survey"
                                                    className="View-Button"
                                                    onClick={() => {
                                                        handleViewSurveyForManager(item);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </LoadingOverlay>
                    </>
                )
                    : role_Name == "Individual" ? (
                        <>
                            <h3 style={{ color: "black", fontWeight: "bold" }} className="ml-2 mt-6">Survey Details</h3>
                            <h3 style={{ color: "black", fontWeight: "bold" }} className="ml-2 mt-2">{currentYear}</h3>
                            <LoadingOverlay
                                active={isActive}
                                spinner={<Triangle
                                    height="120"
                                    width="120"
                                    color="#009bcb"
                                    ariaLabel="triangle-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />}

                                // text='Loading your content...'
                                styles={{
                                    overlay: (base) => ({
                                        ...base,
                                        background: 'rgb(38 41 51 / 78%)',
                                    })
                                }}
                            >
                                {myData?.map((item) => {
                                    return (
                                        <div key={item._id}>
                                            <div className="scroll-container card flex justify-content-between">
                                                <div className="flex flex-row">
                                                    <div className="flex flex-row" style={{ alignItems: "center" }}>
                                                        <h5 style={{ color: 'black' }} className="ml-6">{item?.Name}</h5>
                                                    </div>
                                                    <div className="flex flex-row ml-5" style={{ alignItems: "center" }}>
                                                        <h5 style={{ color: 'black' }} className="ml-6"><Badge value={item?.status == 'pending' ? 'Pending' : 'Completed'} className={item?.status == 'pending' ? 'badge-pending mt-2' : 'badge-success mt-2'} ></Badge> </h5>
                                                    </div>
                                                </div>

                                                <div className='flex justify-content-between' style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                        type="button"
                                                        label="View Survey"
                                                        className="View-Button"
                                                        onClick={() => {
                                                            handleViewSurveyForIndividual(item);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </LoadingOverlay>
                        </>
                    )
                        :
                        null
            }
        </>
    );
};

export default Survey