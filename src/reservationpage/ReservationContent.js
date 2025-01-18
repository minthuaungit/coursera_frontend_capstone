import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Popup from './components/Popup';
import { fetchAPI, submitAPI } from '../simulateApi';

const initialState = {
    date: new Date().toISOString().split('T')[0],
    time: '17:00',
    guests: 1,
    occasion: '',
    firstName: '',
    lastName: '',
    email: '',
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
    return [];
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    guests: Yup.number().min(1, 'At least 1 guest').required('Guests are required'),
    occasion: Yup.string().required('Occasion is required'),
});

const ReservationContent = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [times, setTimes] = useState(initializeTimes(new Date()));
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    useEffect(() => {
        const availableTimes = initializeTimes(new Date());
        setTimes(availableTimes.length ? availableTimes : ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
    }, []);

    const checkExistingBooking = useCallback((form) => {
        const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
        return existingBookings.some(booking => booking.date === form.date && booking.time === form.time);
    }, []);

    useEffect(() => {
        if (isConfirmed) {
            if (checkExistingBooking(formData)) {
                setErrorMessage('Existing booking. Please book another timing.');
                setIsConfirmed(false);
            } else {
                submitAPI(formData);
                const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
                existingBookings.push(formData);
                localStorage.setItem('bookingData', JSON.stringify(existingBookings));
                setIsConfirmed(false);
                setShowPopup(false);
                navigate('/booking-confirmation');
            }
        }
    }, [isConfirmed, formData, navigate, checkExistingBooking]);

    const handleSubmit = (values, { setSubmitting }) => {
        setFormData(values);
        setShowPopup(true);
        setSubmitting(false);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const confirmReservation = () => {
        setIsConfirmed(true);
    };

    const confirmAndCreateNewBooking = (form) => {
        if (checkExistingBooking(form)) {
            setErrorMessage('Existing booking. Please book another timing.');
        } else {
            submitAPI(form);
            const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
            existingBookings.push(form);
            localStorage.setItem('bookingData', JSON.stringify(existingBookings));
            setShowPopup(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form className="reservation-form" aria-labelledby="reservation-form-header">
                        <div className='reservation-form-header' id="reservation-form-header">
                            <div >Reservation Form</div>
                        </div>
                        <div className="form-column">
                            <div className="form-row">
                                <label htmlFor="occasion">Occasion</label>
                                <div className="radio-group" role="radiogroup" aria-labelledby="occasion">
                                    <label>
                                        <Field type="radio" name="occasion" value="Birthday" />
                                        Birthday
                                    </label>
                                    <label>
                                        <Field type="radio" name="occasion" value="Anniversary" />
                                        Anniversary
                                    </label>
                                </div>
                                <ErrorMessage name="occasion" component="div" className="error-message" />
                            </div>
                            <div className="form-row">
                                <div className="first-last-row">
                                    <div className="first-name-div">
                                        <label htmlFor="firstName">First Name</label>
                                        <Field type="text" id="firstName" name="firstName" aria-required="true" />
                                        <ErrorMessage name="firstName" component="div" className="error-message" />
                                    </div>
                                    <div className="last-name-div">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Field type="text" id="lastName" name="lastName" aria-required="true" />
                                        <ErrorMessage name="lastName" component="div" className="error-message" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-column">
                            <div className="form-row">
                                <div className="date-time-guests-row">
                                    <div className="date-input">
                                        <label htmlFor="date">Date</label>
                                        <Field type="date" id="date" name="date" aria-required="true" />
                                        <ErrorMessage name="date" component="div" className="error-message" />
                                    </div>
                                    <div className="time-select">
                                        <label htmlFor="time">Time</label>
                                        <Field as="select" id="time" name="time" aria-required="true">
                                            {times.map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="time" component="div" className="error-message" />
                                    </div>
                                    <div className="guests-select">
                                        <label htmlFor="guests">Guest</label>
                                        <Field as="select" id="guests" name="guests" aria-required="true">
                                            {Array.from({ length: 30 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="guests" component="div" className="error-message" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor="email">Email</label>
                                <Field type="email" id="email" name="email" aria-required="true" />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                            <div className="form-row">
                                <button type="submit" disabled={isSubmitting} id="submit-button">
                                    Make Your reservation
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            {showPopup && (
                <>
                    <Popup onClose={closePopup} setIsConfirmed={setIsConfirmed}>
                        <>
                            <p><b>Reservation For</b></p>
                            <p>First Name: {formData.firstName}</p>
                            <p>Last Name: {formData.lastName}</p>
                            <p>Email: {formData.email}</p>
                            <p>Date: {formData.date}</p>
                            <p>Time: {formData.time}</p>
                            <p>Guests: {formData.guests}</p>
                            <p>Occasion: {formData.occasion}</p>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button className="confirm-button" onClick={confirmReservation}>Confirm</button> &nbsp;
                            <button className="confirm-button hide" onClick={() => confirmAndCreateNewBooking(formData)}>Confirm and create new booking</button>
                        </>
                    </Popup>
                </>
            )}
        </>
    );
};

export default ReservationContent;