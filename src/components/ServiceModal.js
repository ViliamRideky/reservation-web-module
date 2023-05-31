import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useModal } from "../context/ProviderContext";

// ServiceModal component allows the user to select a service option
const ServiceModal = ({ onServiceOptionClick }) => {

    // Using the useModal custom hook to manage modal states and actions
    const { setShowFirstModal, handleOptionSelect, showFirstModal } = useModal();

    // State to store fetched services data
    const [services, setServices] = useState([]);

    // Fetch services data from API
    useEffect(() => {
        fetch("https://sedlacekpeter.site/api/services", {
            headers: {
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0NiIsImp0aSI6ImViY2I3ZWJhYThmYjZmNzBmNTNiM2RmMmE0M2M4YmQ3MmNhMmQzM2FkZTJkMDg1ZjQwMjQxYzc1ZjRmODg0ZTJiNWVkMTg0N2VjM2E1MTkzIiwiaWF0IjoxNjgzMzcwMDI2LjAwMDk4OSwibmJmIjoxNjgzMzcwMDI2LjAwMDk5NCwiZXhwIjoxNzE0OTkyNDI1Ljk4MzI1NSwic3ViIjoiNyIsInNjb3BlcyI6W119.gWZvtPc7GppwQcXWy0otJgduOHfyslyLFqdhT9HevX5dxYMPM_eBRqshWWp3AJOcKg4fLFB5vlYb7fMIMz8TsxQJqEJ9y53HAWEyk3OsLvGVITSCogVQxGBO2ZPPv1GOYp7tQ1AXNM6btg95pw5MDtJTQva_AfGsVLQpACU7OFjQ9U9bJ6WXBAMkR013OPqDHFHN3Pa9KlO_L5VD6CRKJrb9d7fxibHtZtNz6510HKM8Fn42XLPR8xDn-5QSMPFL9ByZL3W-Q2EN-wfUurAVClHTcOc_ZMJvXehKZq5R449val4uWonjEaFznLu5n9xGsyellXxrmkUGfPgpWOPOe8cv47GfEFf0yPRK6edwVMKMikQoxja63TlHLIc-aZjZa2jOLGOnqbA19s4vKymp1hsxIV9zcfOD83Mjte_RiVu4LTEiCAz5A66pEQXhBBsCXPe8rVVT_yIfs9EiUJ2IXOuXVMpkxWP79mbVuD9XUZlmWzImjFx2myjE_LJtA1PekEKRw-qmnGv-Pv0WxVnsKksfZUxfhFZcpvL114Kw0k1IQEafEtyId73Ax_7jfncz3HbdMdPzTZXQmWerPQz29plLGYIWdDdkqT8eVQWhPejps_bYhGRmiZEqWxOZ0IgihTtbTkn7RylaD5SKV4pY-IuHnPkzFDNtmsrIPjVQfb8"
            }
        })
            .then((response) => response.json())
            .then((data) => setServices(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


    return (
        <>
            {/* Button to trigger the ServiceModal */}
            <Button
                variant="secondary"
                onClick={() => setShowFirstModal(true)}
                className="reservation-btn"
            ></Button>

            {/* ServiceModal component */}
            <Modal show={showFirstModal} onHide={() => setShowFirstModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Výber služby</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="services">
                        <Container fluid>
                            <Row>
                                {/* Render service buttons dynamically based on fetched data */}
                                {services.map((service, index) => (
                                    <Col key={index} xs={12} xl={6}>
                                        <Button onClick={() => {
                                            handleOptionSelect(service.name)
                                            onServiceOptionClick(service.id)
                                        }}>
                                            {service.name}
                                        </Button>{" "}
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ServiceModal;
