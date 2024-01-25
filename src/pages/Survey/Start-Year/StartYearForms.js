import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import Form1 from './StartForms/Form1';
import Form2 from './StartForms/Form2';
import Form3 from './StartForms/Form3';
import Form4 from './StartForms/Form4';
import Form5 from './StartForms/Form5';
import { useHistory, useLocation } from 'react-router-dom';

const StartYearForms = () => {

    const location = useLocation();
    const history = useHistory()
    const myData = location.state?.additionalProp;
    console.log("myData", myData)

    const [visible, setVisible] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        form1Data: '',
        form2Data: '',
        form3Data: '',
        form4Data: '',
        form5Data: '',
    });

    const headerList =
        [
            { name: "Personal Information", id: 1 },
            { name: "Top Clifton Strengths", id: 2 },
            { name: "Goals for Growth", id: 3 },
            { name: "Opportunities for Growth", id: 4 },
            { name: "Holistic Life Goals", id: 5 },
        ]

    let currentHeader = headerList.find(item => item.id === currentStep);

    const handleChange = data => {
        setFormData(data);
        setCurrentStep(currentStep + 1);

        if (currentStep === 5) {
            setVisible(false);
            history.push('./surverys')
        }

        currentHeader = headerList.find(item => item.id === currentStep + 1);
    };

    const renderForm = () => {

        if (!visible) {
            return null;
        }

        switch (currentStep) {

            case 1:
                return <Form1 myData={myData} formData={formData} handleChange={handleChange} />;
            case 2:
                return <Form2 myData={myData} formData={formData} handleChange={handleChange} />;
            case 3:
                return <Form3 myData={myData} formData={formData} handleChange={handleChange} />;
            case 4:
                return <Form4 myData={myData} formData={formData} handleChange={handleChange} />;
            case 5:
                return <Form5 myData={myData} formData={formData} handleChange={handleChange} />;
            default:
                return null;
        }
    };

    const onHide = () => {
        setVisible(false)
        history.push('./surverys')
    }

    const Header = () => {
        return (
            <>
                <h4 className="text-center" style={{ fontWeight: "700", color: "black" }}>{currentHeader ? currentHeader.name : ''}</h4>
                <div className="mt-2">
                    <hr />
                </div>
            </>
        )
    }

    return (
        <>

            <Dialog header={Header} style={{ width: '45vw', marginLeft: "290px", boxShadow: '0 15px 20px -5px gray, 0 12px 8px -8px #009bcb' }} visible={visible} onHide={onHide}>
                {renderForm()}
                <div className="footer">
                    Page {currentStep} of 5
                </div>
            </Dialog>
            <div className='text-center'>
                <h2 style={{ color: "black", fontWeight: "700" }}> Start of the Year Survey </h2>
                <h5 style={{ color: "gray", marginTop: "-10px" }}> Please answer the following questions to help us access your performance </h5>
            </div>
        </>
    );
};

export default StartYearForms;
