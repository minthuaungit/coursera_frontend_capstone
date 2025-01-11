import React from 'react';
import FooterNavSection from './components/FooterNavSection';

/* const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%'
};
 */
const FooterContent = () => {
    return (
        <>
        <FooterNavSection />
        <footer className='app-footer'>
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
        </>
    );
};



export default FooterContent;