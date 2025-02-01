import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css'; // Import the CSS for the BookingConfirmation component

const BookingConfirmation = () => {
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('bookingData')) || [];
        setBookingData(data);
    }, []);

    const handleCancel = (index) => {
        const confirmCancel = window.confirm("Are you sure to cancel the booking?");
        if (confirmCancel) {
            const updatedBookings = bookingData.filter((_, i) => i !== index);
            localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
            setBookingData(updatedBookings);
        }
    };

    if (bookingData.length === 0) {
        return <p>No booking found</p>;
    }

    return (
        <div className="booking-confirmation">
            <h1>Booking Confirmation</h1>
            <table className="booking-table" role="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Guests</th>
                        <th scope="col">Occasion</th>
                        <th scope="col">Action</th>
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
                            <td><button className="cancel-button" onClick={() => handleCancel(index)} aria-label={`Cancel booking for ${booking.firstName} ${booking.lastName}`}>Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingConfirmation;
