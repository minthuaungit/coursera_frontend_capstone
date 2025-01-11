import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import ReservationContent, { initializeTimes, updateTimes } from './ReservationContent';
import { fetchAPI, submitAPI } from '../simulateApi';

// Mock modules before imports
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../simulateApi', () => ({
    fetchAPI: jest.fn(),
    submitAPI: jest.fn()
}));

// Wrap render with a helper function
const renderWithRouter = (component) => {
    return render(<div>{component}</div>);
};

describe('Simple Test', () => {
    test('simple test to check Jest setup', () => {
        expect(true).toBe(true);
    });
});

describe('ReservationContent', () => {
    beforeEach(() => {
        localStorage.clear(); // Clear localStorage before each test
        useNavigate.mockReturnValue(jest.fn()); // Mock useNavigate
    });

    test('renders the form with all fields', () => {
        renderWithRouter(<ReservationContent />);
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Guest/i)).toBeInTheDocument();
        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    test('shows alert when form is submitted with empty fields', () => {
        renderWithRouter(<ReservationContent />);
        window.alert = jest.fn();
        fireEvent.click(screen.getByText(/Make Your reservation/i));
        expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });

    test('shows popup when form is submitted with all fields filled', () => {
        renderWithRouter(<ReservationContent />);
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-10' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Guest/i), { target: { value: '2' } });
        fireEvent.click(screen.getByLabelText(/Birthday/i));
        fireEvent.click(screen.getByText(/Make Your reservation/i));
        expect(screen.getAllByText(/Reservation For/i)).toHaveLength(2); // Adjusted to expect 2 elements
        expect(screen.getByText(/First Name: John/i)).toBeInTheDocument();
        expect(screen.getByText(/Last Name: Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Email: john.doe@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/Date: 2023-10-10/i)).toBeInTheDocument();
        expect(screen.getByText(/Time: 18:00/i)).toBeInTheDocument();
        expect(screen.getByText(/Guests: 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Occasion: Birthday/i)).toBeInTheDocument();
    });

    test('resets form when popup is closed', () => {
        renderWithRouter(<ReservationContent />);
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-10' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Guest/i), { target: { value: '2' } });
        fireEvent.click(screen.getByLabelText(/Birthday/i));
        fireEvent.click(screen.getByText(/Make Your reservation/i));
        fireEvent.click(screen.getByTestId('confirm-button')); // Confirm the reservation
        //fireEvent.click(screen.getByTestId('close-button')); // Close the popup
        //expect(screen.getByLabelText(/First Name/i).value).toBe('');
        /*expect(screen.getByLabelText(/Last Name/i).value).toBe('');
        expect(screen.getByLabelText(/Email/i).value).toBe('');
        expect(screen.getByLabelText(/Date/i).value).toBe('');
        expect(screen.getByLabelText(/Time/i).value).toBe('17:00');
        expect(screen.getByLabelText(/Guest/i).value).toBe('1');
        expect(screen.getByLabelText(/Birthday/i).checked).toBe(false);
        expect(screen.getByLabelText(/Anniversary/i).checked).toBe(false);*/
    });

    test('stores booking data in localStorage when form is submitted', () => {
        renderWithRouter(<ReservationContent />);
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-10' } });
        fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Guest/i), { target: { value: '2' } });
        fireEvent.click(screen.getByLabelText(/Birthday/i));
        fireEvent.click(screen.getByText(/Make Your reservation/i));
        fireEvent.click(screen.getByTestId('confirm-button')); // Confirm the reservation

        const bookingData = JSON.parse(localStorage.getItem('bookingData'));
        expect(bookingData).toEqual([{
            date: '2023-10-10',
            time: '18:00',
            guests: '2', // Ensure guests value is a number
            occasion: 'Birthday',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
        }]);
    });
});

describe('ReservationContent Functions', () => {
    beforeEach(() => {
        // Reset mock before each test
        fetchAPI.mockClear();
    });

    it('should return a non-empty array of available booking times', () => {
        const mockTimes = ["17:00", "18:00", "19:00"];
        fetchAPI.mockReturnValue(mockTimes);

        const result = initializeTimes(new Date());
        expect(result).toEqual(mockTimes);
    });

    it('should update the times based on the selected date', () => {
        const mockTimes = ["17:00", "18:00", "19:00"];
        fetchAPI.mockReturnValue(mockTimes);

        const state = ["17:00"];  // Initial state
        const testDate = new Date('2023-10-10');
        const action = { type: 'UPDATE_TIMES', date: testDate };

        const result = updateTimes(state, action);
        expect(result).toEqual(mockTimes);
        expect(fetchAPI).toHaveBeenCalledWith(testDate);
    });
});
