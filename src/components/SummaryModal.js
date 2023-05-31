import React from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft } from "react-icons/bs";
import { setHours, setMinutes, setSeconds, formatISO } from 'date-fns';
import { useModal } from "../context/ProviderContext";

// SummaryModal component for displaying selected options
const SummaryModal = ({ selectedService }) => {

    // Destructure modal state and functions from useModal custom hook
    const { showFourthModal, setShowFourthModal, handleBackToThirdModal, selectedOption, selectedDate, selectedTimeFrom, selectedTimeTo, formData, handleFinalSubmit } = useModal()

    // Function to send order data to API
    const sendOrderData = async () => {
        const selectedDateTime = new Date(selectedDate);
        const selectedFromTime = new Date(`2000-01-01T${selectedTimeFrom}`);
        const hours = selectedFromTime.getHours();
        const minutes = selectedFromTime.getMinutes();

        const adjustedDateTime = setSeconds(setMinutes(setHours(selectedDateTime, hours), minutes), 0);

        const orderData = {
            service_id: selectedService,
            date: formatISO(adjustedDateTime, { representation: 'date' }) + " " + formatISO(adjustedDateTime, { representation: 'time' }).slice(0, 8),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
        };

        console.log('Order data:', orderData)

        // POST request to submit reservation
        try {
            const response = await fetch('https://sedlacekpeter.site/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0NiIsImp0aSI6ImViY2I3ZWJhYThmYjZmNzBmNTNiM2RmMmE0M2M4YmQ3MmNhMmQzM2FkZTJkMDg1ZjQwMjQxYzc1ZjRmODg0ZTJiNWVkMTg0N2VjM2E1MTkzIiwiaWF0IjoxNjgzMzcwMDI2LjAwMDk4OSwibmJmIjoxNjgzMzcwMDI2LjAwMDk5NCwiZXhwIjoxNzE0OTkyNDI1Ljk4MzI1NSwic3ViIjoiNyIsInNjb3BlcyI6W119.gWZvtPc7GppwQcXWy0otJgduOHfyslyLFqdhT9HevX5dxYMPM_eBRqshWWp3AJOcKg4fLFB5vlYb7fMIMz8TsxQJqEJ9y53HAWEyk3OsLvGVITSCogVQxGBO2ZPPv1GOYp7tQ1AXNM6btg95pw5MDtJTQva_AfGsVLQpACU7OFjQ9U9bJ6WXBAMkR013OPqDHFHN3Pa9KlO_L5VD6CRKJrb9d7fxibHtZtNz6510HKM8Fn42XLPR8xDn-5QSMPFL9ByZL3W-Q2EN-wfUurAVClHTcOc_ZMJvXehKZq5R449val4uWonjEaFznLu5n9xGsyellXxrmkUGfPgpWOPOe8cv47GfEFf0yPRK6edwVMKMikQoxja63TlHLIc-aZjZa2jOLGOnqbA19s4vKymp1hsxIV9zcfOD83Mjte_RiVu4LTEiCAz5A66pEQXhBBsCXPe8rVVT_yIfs9EiUJ2IXOuXVMpkxWP79mbVuD9XUZlmWzImjFx2myjE_LJtA1PekEKRw-qmnGv-Pv0WxVnsKksfZUxfhFZcpvL114Kw0k1IQEafEtyId73Ax_7jfncz3HbdMdPzTZXQmWerPQz29plLGYIWdDdkqT8eVQWhPejps_bYhGRmiZEqWxOZ0IgihTtbTkn7RylaD5SKV4pY-IuHnPkzFDNtmsrIPjVQfb8"
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok || response.headers.get("Content-Type") !== "application/json") {
                // console.error("Server responded with an error or non-JSON content:", await response.text());
                return;
            }

            const data = await response.json();
            // console.log('Order data:', data);
            // Do something with the response data
        } catch (error) {
            console.error('Error:', error);
            // Handle the error
        }
    };

    return (
        <>
            <Modal show={showFourthModal} onHide={() => setShowFourthModal(false)}>
                <Modal.Header closeButton>
                    <Button variant="light" onClick={handleBackToThirdModal}>
                        <BsArrowLeft className='arrow' />
                    </Button>
                    <Modal.Title>Informácie o rezervácií</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Služba: <strong>{selectedOption}</strong>
                    </p>
                    <p>
                        Dátum: <strong>{new Date(selectedDate).toLocaleDateString()}</strong>
                    </p>
                    <p>
                        Čas: <strong>{selectedTimeFrom}</strong> - <strong>{selectedTimeTo}</strong>
                    </p>
                    <p>
                        Meno: <strong>{formData.firstName}</strong>
                    </p>
                    <p>
                        Priezvisko: <strong>{formData.lastName}</strong>
                    </p>
                    <p>
                        Email: <strong>{formData.email}</strong>
                    </p>
                    <p>
                        Tel.č.: <strong>{formData.phone}</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleFinalSubmit();
                        sendOrderData();
                    }}>
                        Potvrdenie rezervácie
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default SummaryModal