import { useState, useContext, createContext } from 'react';
import * as Yup from "yup";
import React from 'react';

// Create context for modal state management
const ModalContext = createContext();

// ModalProvider component provides modal context to its children
const ModalProvider = ({ children }) => {
    const search = useProvideSearch();
    return (
        <ModalContext.Provider value={search}>{children}</ModalContext.Provider>
    );
};

export default ModalProvider;

// Custom hook to access the modal context
export const useModal = () => {
    return useContext(ModalContext);
};

// Custom hook that provides modal state and functions
const useProvideSearch = () => {
    // State variables for controlling modal visibility and selected values
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [showThirdModal, setShowThirdModal] = useState(false);
    const [showFourthModal, setShowFourthModal] = useState(false);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeFrom, setSelectedTimeFrom] = useState("");
    const [selectedTimeTo, setSelectedTimeTo] = useState("");
    const [canProceed, setCanProceed] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowFirstModal(false);
        setShowSecondModal(true);
    };

    const handleBackToFirstModal = () => {
        setSelectedOption("");
        setShowSecondModal(false);
        setShowFirstModal(true);
    };

    const handleDateChange = (date) => {
        let newDate = date instanceof Date ? date : new Date(date);
        setSelectedDate(newDate);
        updateCanProceed(newDate, selectedTimeFrom, selectedTimeTo);
    };

    const timeOptions = [
        '8:00 - 9:00',
        '9:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '12:00 - 13:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
    ];

    const handleTimeChange = (value) => {
        const [from, to] = value.split(' - ');
        setSelectedTimeFrom(from);
        setSelectedTimeTo(to);
        updateCanProceed(selectedDate, from, to);
    };

    function updateCanProceed(date, timeFrom, timeTo) {
        if (date && timeFrom && timeTo) {
            setCanProceed(true);
        } else {
            setCanProceed(false);
        }
    }

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            setShowSecondModal(false);
            setShowThirdModal(false);
            setShowFourthModal(true);
            setSubmitting(false);
        }, 400);
        setFormData(values);
    };

    const handleBackToSecondModal = () => {
        setShowThirdModal(false);
        setShowSecondModal(true);
    };

    const handleBackToThirdModal = () => {
        setShowFourthModal(false);
        setShowThirdModal(true);
    }

    const handleFinalSubmit = () => {
        setShowFourthModal(false);
        setShowFirstModal(false);
        setShowSecondModal(false);
        setShowThirdModal(false);
        setShowFinalModal(true)

        setTimeout(() => {
            setShowFinalModal(false);
            window.location.reload(); // Refresh the page after 2 seconds
        }, 2000);
    };

    const handleHideDateModal = () => {
        setShowThirdModal(true);
        setShowSecondModal(false)
    }

    const nameRegex = /^[a-žA-Ž]+$/
    const phoneRegex1 = /^[+]{1}[4]{1}[2]{1}[1]{1}[0-9]{3}[0-9]{3}[0-9]{3}$/
    const phoneRegex2 = /^[+]{1}[4]{1}[2]{1}[1]{1}\s\d[0-9]{3}\s\d[0-9]{3}\s\d[0-9]{3}$/
    const emailRegex = /^[a-zA-Z0-9.+-]{3,}@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,4}$/;


    const validationSchema = Yup.object().shape({
        firstName: Yup.string().matches(nameRegex, "Iba písmená sú povolené").required("Povinná položka"),
        lastName: Yup.string().matches(nameRegex, "Iba písmená sú povolené").required("Povinná položka"),
        email: Yup.string().matches(emailRegex, "Nesprávny formát").required("Povinná položka"),
        phone: Yup.string().matches(phoneRegex1 | phoneRegex2, "Nespravný formát +421 *** *** ***").required("Povinná položka"),
    });

    // Awesome return statement
    return {
        handleOptionSelect,
        handleBackToFirstModal,
        handleBackToSecondModal,
        handleBackToThirdModal,
        handleHideDateModal,
        handleSubmit,
        handleFinalSubmit,
        handleDateChange,
        handleTimeChange,
        validationSchema,
        setFormData,
        formData,
        showFirstModal,
        showSecondModal,
        showThirdModal,
        showFourthModal,
        showFinalModal,
        selectedDate,
        selectedTimeFrom,
        selectedTimeTo,
        selectedOption,
        timeOptions,
        setShowFirstModal,
        setShowSecondModal,
        setShowThirdModal,
        setShowFourthModal,
        setShowFinalModal,
        setSelectedOption,
        setSelectedDate,
        setSelectedTimeFrom,
        setSelectedTimeTo,
        updateCanProceed,
        canProceed,
    }
}