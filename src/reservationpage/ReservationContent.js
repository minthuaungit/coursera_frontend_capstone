import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Popup from './components/Popup'; // Import the Popup component 
import { fetchAPI, submitAPI } from '../simulateApi'; // Update import path

const initialState = {
    date: new Date().toISOString().split('T')[0], // Set default date to today
    time: '17:00',
    guests: 1,
    occasion: '',
    firstName: '',
    lastName: '',
    email: '',
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return fetchAPI(new Date(action.date));
        default:
            return state;
    }
};

export const initializeTimes = (date) => {
    if (date) {
        return fetchAPI(new Date(date)) || [];
    }
    //if data is not return from api.
    //return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    return [];
};

const ReservationContent = () => {
    const [form, dispatch] = useReducer(formReducer, initialState);
    const [showPopup, setShowPopup] = useState(false);
    const [times, setTimes] = useState(initializeTimes(new Date())); // Ensure a valid date is passed and fallback to empty array
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const availableTimes = initializeTimes(form.date);
        setTimes(availableTimes.length ? availableTimes : ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]); // Fallback times
    }, [form.date]);

    const checkExistingBooking = useCallback(() => {
        const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
        return existingBookings.some(booking => booking.date === form.date && booking.time === form.time);
    }, [form.date, form.time]);

    useEffect(() => {
        if (isConfirmed) {
            if (checkExistingBooking()) {
                setErrorMessage('Existing booking. Please book another timing.');
                setIsConfirmed(false);
            } else {
                submitAPI(form);
                const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
                existingBookings.push(form);
                localStorage.setItem('bookingData', JSON.stringify(existingBookings)); // Store data in local storage
                setIsConfirmed(false);
                setShowPopup(false);
                dispatch({ type: 'RESET_FORM' });
                navigate('/booking-confirmation'); // Navigate to BookingConfirmation page
            }
        }
    }, [isConfirmed, form, navigate, checkExistingBooking]);

    const validateForm = () => {
        const { date, time, guests, occasion, firstName, lastName, email } = form;
        if (!date || !time || !guests || !occasion || !firstName || !lastName || !email) {
            alert('Please fill in all fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const confirmReservation = () => {
        setIsConfirmed(true);
    };

    const confirmAndCreateNewBooking = () => {
        if (checkExistingBooking()) {
            setErrorMessage('Existing booking. Please book another timing.');
        } else {
            submitAPI(form);
            const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
            existingBookings.push(form);
            localStorage.setItem('bookingData', JSON.stringify(existingBookings)); // Store data in local storage
            setShowPopup(false);
            dispatch({ type: 'RESET_FORM' });
        }
    };

    return (
        <>
            <>
                <form onSubmit={handleSubmit} className="reservation-form" aria-labelledby="reservation-form-header">
                    <div className='reservation-form-header' id="reservation-form-header">
                        <div className=''>Reservation Form</div>
                    </div>
                    <div className="form-column">
                        <div className="form-row">
                            <label htmlFor="occasion">Occasion</label>
                            <div className="radio-group" role="radiogroup" aria-labelledby="occasion">
                                <label>
                                    <input
                                        type="radio"
                                        name="occasion"
                                        value="Birthday"
                                        checked={form.occasion === 'Birthday'}
                                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'occasion', value: e.target.value })}
                                        aria-checked={form.occasion === 'Birthday'}
                                    />
                                    Birthday
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="occasion"
                                        value="Anniversary"
                                        checked={form.occasion === 'Anniversary'}
                                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'occasion', value: e.target.value })}
                                        aria-checked={form.occasion === 'Anniversary'}
                                    />
                                    Anniversary
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="first-last-row">
                                <div className="first-name-div">
                                    <label htmlFor="first-name">First Name</label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        value={form.firstName}
                                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'firstName', value: e.target.value })}
                                        aria-required="true"
                                    />
                                </div>
                                <div className="last-name-div">
                                    <label htmlFor="last-name">Last Name</label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        value={form.lastName}
                                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'lastName', value: e.target.value })}
                                        aria-required="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-row">
                            <div className="date-time-guests-row">
                                <div className="date-input">
                                    <label htmlFor="res-date">Date</label>
                                    <input
                                        type="date"
                                        id="res-date"
                                        value={form.date}
                                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'date', value: e.target.value })}
                                        style={{ width: '90%' }}
                                        aria-required="true"
                                    />
                                </div>
                                <div className="time-select">
                                    <label htmlFor="res-time">Time</label>
                                    <select
                                        id="res-time"
                                        value={form.time}
                                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'time', value: e.target.value })}
                                        style={{ width: '90%' }}
                                        aria-required="true"
                                    >
                                        {times.map((time) => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="guests-select">
                                    <label htmlFor="guests">Guest</label>
                                    <select
                                        id="guests"
                                        value={form.guests}
                                        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'guests', value: e.target.value })}
                                        style={{ width: '90%' }}
                                        aria-required="true"
                                    >
                                        {Array.from({ length: 30 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={form.email}
                                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })}
                                aria-required="true"
                            />
                        </div>
                        <div className="form-row">
                            <input type="submit" value="Make Your reservation" id="submit-button" />
                        </div>
                    </div>
                </form>
            </>
            {showPopup && (
                <>
                    <Popup onClose={closePopup} setIsConfirmed={setIsConfirmed}>
                        <>
                            <p><b>Reservation For</b></p>
                            <p>First Name: {form.firstName}</p>
                            <p>Last Name: {form.lastName}</p>
                            <p>Email: {form.email}</p>
                            <p>Date: {form.date}</p>
                            <p>Time: {form.time}</p>
                            <p>Guests: {form.guests}</p>
                            <p>Occasion: {form.occasion}</p>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button className="confirm-button" onClick={confirmReservation}>Confirm</button> &nbsp;
                            <button className="confirm-button hide" onClick={confirmAndCreateNewBooking}>Confirm and create new booking</button>
                        </>
                    </Popup>
                </>
            )}
        </>
    );
};

export default ReservationContent;