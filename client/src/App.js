import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CreateForm, Home, PreviewForm, ThankYouPage } from "./pages";

function App() {

  const [activeOption, setActiveOption] = useState(null);

  // Function to handle the option selection from the navbar
  const handleOptionSelect = (option) => {
    setActiveOption(option);
  };

  return (
    <div className="App">
      <Navbar onOptionSelect={handleOptionSelect} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/forms" element={<CreateForm />} />
        <Route path="/preview" element={<PreviewForm />} />
        <Route path="/thankyou" element={<ThankYouPage />} />

      </Routes>
    </div>
  );
}

export default App;
