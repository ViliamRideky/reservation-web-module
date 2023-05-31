import React from 'react';
import ReactDOM from 'react-dom/client';
import ServiceModal from "./components/ServiceModal"
import DateTimeModal from "./components/DateTimeModal"
import ContactInfoModal from "./components/ContactInfoModal"
import SummaryModal from "./components/SummaryModal"
import FinalModal from "./components/FinalModal"
import ModalProvider from "./context/ProviderContext"
import { useState } from "react"
import './style.css'

//In addition, the ServiceModal and DateTimeModal components are dynamically updated based on the state of the selectedService.
const App = () => {

    const [selectedService, setSelectedService] = useState("")

    return (
        <ModalProvider >
            <ServiceModal onServiceOptionClick={(selectedService) => { setSelectedService(selectedService) }} />
            <DateTimeModal selectedService={selectedService} />
            <ContactInfoModal />
            <SummaryModal selectedService={selectedService} />
            <FinalModal />
        </ModalProvider>
    )
}
export default App

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

