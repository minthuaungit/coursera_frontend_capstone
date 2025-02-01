import React from 'react';
import FooterNavSection from './components/FooterNavSection';

const FooterContent = () => {
    return (
        <>
        <FooterNavSection />
        <footer className='app-footer' role="contentinfo">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
        </>
    );
};

export default FooterContent;