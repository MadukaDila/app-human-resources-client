import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Homepage from "./pages/home";
import AttendanceUpload from "./pages/upload";

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload" element={<AttendanceUpload />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
