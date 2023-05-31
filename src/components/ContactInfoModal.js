import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft } from "react-icons/bs";
import { useModal } from "../context/ProviderContext";

// ContactInfoModal component for contact info form
const ContactInfoModal = () => {

    // Destructure modal state and functions from useModal custom hook
    const { showThirdModal, setShowThirdModal, handleBackToSecondModal, formData, validationSchema, handleSubmit } = useModal()

    return (
        <>
            <Modal show={showThirdModal}
                onHide={() => setShowThirdModal(false)}
            >
                <Modal.Header closeButton>
                    <Button variant="light" onClick={handleBackToSecondModal}>
                        <BsArrowLeft className='arrow' />
                    </Button>
                    <Modal.Title>Kontaktné údaje</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={formData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Modal.Body>
                                <div className="form-group">
                                    <label htmlFor="firstName">Meno</label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        placeholder="Vyplnte meno"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Priezvisko</label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        placeholder="Vyplnte priezvisko"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Vyplnte email"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Telefónne číslo</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        placeholder="+421987654321"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Pokračovať
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}
export default ContactInfoModal