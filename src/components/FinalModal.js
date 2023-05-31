import React from "react";
import { Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useModal } from "../context/ProviderContext";

// FinalModal with a thank you message
const FinalModal = () => {

    // Destructure modal state and function from useModal custom hook
    const { showFinalModal, setShowFinalModal } = useModal()

    return (
        <>
            <Modal show={showFinalModal} onHide={() => setShowFinalModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ďakujeme za Vašu rezerváciu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>
                        Informácie o rezervácií budú zaslané na email
                    </h6>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default FinalModal