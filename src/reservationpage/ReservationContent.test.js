import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
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

    test('shows popup when form is submitted with all fields filled', async () => {
        await act(async () => {
            renderWithRouter(<ReservationContent />);
        });
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
            fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-10' } });
            fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
            fireEvent.change(screen.getByLabelText(/Guest/i), { target: { value: '2' } });
            fireEvent.click(screen.getByLabelText(/Birthday/i));
            fireEvent.click(screen.getByText(/Make Your reservation/i));
        });
        expect(screen.getByText('Reservation For')).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.startsWith('First Name:') && content.includes('John'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.startsWith('Last Name:') && content.includes('Doe'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.startsWith('Email:') && content.includes('john.doe@example.com'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.startsWith('Date:') && content.includes('2023-10-10'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.startsWith('Time:') && content.includes('18:00'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.startsWith('Guests:') && content.includes('2'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.startsWith('Occasion:') && content.includes('Birthday'))).toBeInTheDocument();
    });

    test('stores booking data in localStorage when form is submitted', async () => {
        await act(async () => {
            renderWithRouter(<ReservationContent />);
        });
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
            fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
            fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
            fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2023-10-10' } });
            fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
            fireEvent.change(screen.getByLabelText(/Guest/i), { target: { value: '2' } });
            fireEvent.click(screen.getByLabelText(/Birthday/i));
            fireEvent.click(screen.getByText(/Make Your reservation/i));
        });

        // Ensure the popup is rendered and the confirm button is clicked
        await act(async () => {
            const confirmButton = await screen.findByText('Confirm');
            fireEvent.click(confirmButton); // Confirm the reservation
        });

        const bookingData = JSON.parse(localStorage.getItem('bookingData'));
        bookingData[0].guests = parseInt(bookingData[0].guests, 10); // Ensure guests value is a number
        expect(bookingData).toEqual([{
            date: '2023-10-10',
            time: '18:00',
            guests: 2,
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
