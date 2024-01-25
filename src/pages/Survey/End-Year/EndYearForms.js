import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useHistory, useLocation } from 'react-router-dom';
import Form1 from './EndForms/Form1';
import Form2 from './EndForms/Form2';
import Form3 from './EndForms/Form3';
import Form4 from './EndForms/Form4';
import Form5 from './EndForms/Form5';
import Form6 from './EndForms/Form6';

const EndYearForms = () => {

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
        form6Data: '',
    });

    const headerList =
        [
            { name: "Personal Information", id: 1 },
            { name: "Top Clifton Strengths", id: 2 },
            { name: "End Year Review of Growth Goals", id: 3 },
            { name: "Review of Opportunities for Growth", id: 4 },
            { name: "Review of Holistic Life Goals", id: 5 },
            { name: "Your Achievements for the year", id: 6 },
        ]

    let currentHeader = headerList.find(item => item.id === currentStep);

    const handleChange = data => {
        setFormData(data);
        setCurrentStep(currentStep + 1);

        if (currentStep === 6) {
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
            case 6:
                return <Form6 myData={myData} formData={formData} handleChange={handleChange} />;
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
                    Page {currentStep} of 6
                </div>
            </Dialog>
            <div className='text-center'>
                <h2 style={{ color: "black", fontWeight: "700" }}> End of the Year Survey </h2>
                <h5 style={{ color: "gray", marginTop: "-10px" }}> Please answer the following questions to help us access your performance </h5>
            </div>
        </>
    );
};

export default EndYearForms;
