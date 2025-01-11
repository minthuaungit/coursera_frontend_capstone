import React from 'react';
import './App.css';
import Header from './layout/Header';
import { Routes, Route } from 'react-router-dom';
import MainContent from './homepage/MainContent';
import ReservationContent from './reservationpage/ReservationContent';
import FooterContent from './layout/FooterContent';
import About from './aboutpage/About';
import BookingConfirmation from './bookingconfirmation/BookingConfirmation';

function App() {
  return (
    <div className="main-grid">
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservation" element={<ReservationContent />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>
      <FooterContent />
    </div>
  );
}

export default App;
