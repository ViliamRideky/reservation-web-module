import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft } from "react-icons/bs";
import { useModal } from "../context/ProviderContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-multi-date-picker";

// Footer component to display error messages below the date picker calendar
const Footer = ({ CustomErrorMessage, errorMessage }) => {
    return (
        <>
            {errorMessage && <CustomErrorMessage message={errorMessage} />}
        </>
    )
}

// DateTimeModal component for selecting date and time
const DateTimeModal = ({ selectedService }) => {

    //console.log(selectedService);

    // State to store fetched services data
    const [services, setServices] = useState(null);

    // Function to convert date object to local ISO string
    function toLocalISOString(date) {
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
        return adjustedDate.toISOString().slice(0, 10);
    }


    // Fetch free slots data when selectedService changes
    useEffect(() => {
        if (!selectedService) {
            return;
        }
        fetch("https://sedlacekpeter.site/api/services/" + selectedService + "/freeSlots", {
            headers: {
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0NiIsImp0aSI6ImViY2I3ZWJhYThmYjZmNzBmNTNiM2RmMmE0M2M4YmQ3MmNhMmQzM2FkZTJkMDg1ZjQwMjQxYzc1ZjRmODg0ZTJiNWVkMTg0N2VjM2E1MTkzIiwiaWF0IjoxNjgzMzcwMDI2LjAwMDk4OSwibmJmIjoxNjgzMzcwMDI2LjAwMDk5NCwiZXhwIjoxNzE0OTkyNDI1Ljk4MzI1NSwic3ViIjoiNyIsInNjb3BlcyI6W119.gWZvtPc7GppwQcXWy0otJgduOHfyslyLFqdhT9HevX5dxYMPM_eBRqshWWp3AJOcKg4fLFB5vlYb7fMIMz8TsxQJqEJ9y53HAWEyk3OsLvGVITSCogVQxGBO2ZPPv1GOYp7tQ1AXNM6btg95pw5MDtJTQva_AfGsVLQpACU7OFjQ9U9bJ6WXBAMkR013OPqDHFHN3Pa9KlO_L5VD6CRKJrb9d7fxibHtZtNz6510HKM8Fn42XLPR8xDn-5QSMPFL9ByZL3W-Q2EN-wfUurAVClHTcOc_ZMJvXehKZq5R449val4uWonjEaFznLu5n9xGsyellXxrmkUGfPgpWOPOe8cv47GfEFf0yPRK6edwVMKMikQoxja63TlHLIc-aZjZa2jOLGOnqbA19s4vKymp1hsxIV9zcfOD83Mjte_RiVu4LTEiCAz5A66pEQXhBBsCXPe8rVVT_yIfs9EiUJ2IXOuXVMpkxWP79mbVuD9XUZlmWzImjFx2myjE_LJtA1PekEKRw-qmnGv-Pv0WxVnsKksfZUxfhFZcpvL114Kw0k1IQEafEtyId73Ax_7jfncz3HbdMdPzTZXQmWerPQz29plLGYIWdDdkqT8eVQWhPejps_bYhGRmiZEqWxOZ0IgihTtbTkn7RylaD5SKV4pY-IuHnPkzFDNtmsrIPjVQfb8"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log('Loaded data from API:', data);
                setServices(data);
            });
    }, [selectedService]);


    // Function to get time options for a specific date
    const getTimeOptionsForDate = useCallback((dateString) => {
        if (!services || !dateString) {
            return [];
        }
        const foundDate = services.find((service) => service.date === dateString);
        const freeSlots = foundDate ? foundDate.freeSlots : [];
        console.log('Free slots for date', dateString, ':', freeSlots);
        return freeSlots;
    }, [services]);


    // Using the useModal custom hook to manage modal states and actions
    const {
        showSecondModal, setShowSecondModal, handleBackToFirstModal, selectedDate, handleDateChange, selectedTime, handleTimeChange, handleHideDateModal, canProceed
    } = useModal()

    // State to store time options based on the selected date
    const [timeOptions, setTimeOptions] = useState([]);

    // Update time options when selectedDate or services change
    useEffect(() => {
        if (selectedDate) {
            const dateString = toLocalISOString(selectedDate);
            setTimeOptions(getTimeOptionsForDate(dateString));
        } else {
            setTimeOptions([]);
        }
    }, [selectedDate, services, getTimeOptionsForDate]);

    const CustomErrorMessage = ({ message }) => {
        return <p className="error-m" style={{ color: "red" }}>{message}</p>;
    };

    const [errorMessage, setErrorMessage] = useState("");

    const handleDayClick = (selectedDate) => {
        console.log('handleDayClick called with date', selectedDate);

        if (!selectedDate || !(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
            console.log('Invalid date');
            // Date is not valid, handle the error
            return;
        }

        let isWeekend = [0, 6].includes(selectedDate.getDay());
        const dateString = toLocalISOString(selectedDate);
        let nofree = getTimeOptionsForDate(dateString).length === 0;

        if (isWeekend || nofree) {
            console.log('Setting error message: Nedostupný deň');
            setErrorMessage("Nedostupný deň");
        } else {
            console.log('Clearing error message');
            setErrorMessage("");
        }
    }

    return (
        <>
            {/* DateTimeModal component */}
            <Modal show={showSecondModal} onHide={() => setShowSecondModal(false)}>
                <Modal.Header closeButton>
                    <Button variant="light" onClick={handleBackToFirstModal}>
                        <BsArrowLeft className='arrow' />
                    </Button>
                    <Modal.Title>Výber dátumu a času</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="date-time" xs={12} xl={6}>
                            {/* DatePicker component */}
                            <DatePicker
                                placeholder="Vyberte dátum"
                                value={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                onOpenPickNewDate={false}
                                editable={false}
                                plugins={[
                                    <Footer position="bottom" CustomErrorMessage={CustomErrorMessage} errorMessage={errorMessage} />
                                ]}
                                mapDays={({ date }) => {
                                    const selectedDate = new Date(date);
                                    let isWeekend = [0, 6].includes(selectedDate.getDay());
                                    const dateString = toLocalISOString(selectedDate);
                                    let nofree = getTimeOptionsForDate(dateString).length === 0;
                                    let now = new Date();
                                    now.setHours(0, 0, 0, 0);

                                    if (selectedDate < now || isWeekend) {
                                        return {
                                            disabled: true,
                                            style: { color: "#ccc" },
                                            onClick: () => handleDayClick(selectedDate),
                                        }
                                    } else if (nofree) {
                                        return {
                                            disabled: true,
                                            style: { color: "#f21000" },
                                            onClick: () => handleDayClick(selectedDate),
                                        }
                                    } else {
                                        return {
                                            className: "highlight highlight-green",
                                            onClick: () => handleDayClick(selectedDate),
                                        }
                                    }
                                }}

                            />

                        </Col>
                        <Col className="date-time" xs={12} xl={6}>
                            <select className="selectos" value={selectedTime} onChange={(e) => handleTimeChange(e.target.value)}>
                                <option value=""> Vyberte čas</option>
                                {timeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleHideDateModal} disabled={!!errorMessage || !canProceed}>
                        Pokračovať
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DateTimeModal;