import React from 'react';

import { Link } from 'react-router-dom';

const FooterNavSection = () => {
    return (
        <div className="main-footer-section">
            <div className="footer-logo">
                <img src={'/icons_assets/Logo.svg'} alt="logo" />
            </div>
            <div className="footer-content">
                <h4>Navigation</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/">Menu</Link></li>
                    <li><Link to="/reservation">Reservation</Link></li>
                    <li><Link to="/">Order Online</Link></li>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/">Help</Link></li>
                </ul>
            </div>
            <div className="footer-content">
                <h4>Contact</h4>
                <p>123 Main Street, Chicago, IL 60601</p>
                <p>Email: info@littlelemon.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
            <div className="footer-content">
                <h4>Social Media</h4>
                <ul>
                    <li><a href="#facebook">Facebook</a></li>
                    <li><a href="#twitter">Twitter</a></li>
                    <li><a href="#instagram">Instagram</a></li>
                </ul>
            </div>
        </div>
    );
};

export default FooterNavSection;