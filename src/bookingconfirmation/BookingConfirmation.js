import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css'; // Import the CSS for the BookingConfirmation component

const BookingConfirmation = () => {
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('bookingData')) || [];
        setBookingData(data);
    }, []);

    const handleCancel = (index) => {
        const updatedBookings = bookingData.filter((_, i) => i !== index);
        localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
        setBookingData(updatedBookings);
    };

    if (bookingData.length === 0) {
        return <p>No booking found</p>;
    }

    return (
        <div className="booking-confirmation">
            <h1>Booking Confirmation</h1>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Occasion</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingData.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.firstName}</td>
                            <td>{booking.lastName}</td>
                            <td>{booking.email}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.guests}</td>
                            <td>{booking.occasion}</td>
                            <td><button className="cancel-button" onClick={() => handleCancel(index)}>Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingConfirmation;
