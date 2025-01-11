import React from 'react';

const FooterNavSection = () => {
    return (
        <div className="main-footer-section">
            <div className="footer-logo">
                <img src={'/icons_assets/Logo.svg'} alt="logo" />
            </div>
            <div className="footer-content">
                <h4>Navigation</h4>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#menu">Menu</a></li>
                    <li><a href="#reservations">Reservations</a></li>
                    <li><a href="#orderonline">Order online</a></li>
                    <li><a href="#login">Login</a></li>
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