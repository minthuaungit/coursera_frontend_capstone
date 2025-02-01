import React from 'react';
import Nav from './Nav';

const Header = () => {
    return (
        <>
            {/* meta tags and other stuff are in the index.html file at the public folder */}
            <div className="main-app-header-grid">
                <header className='app-header' role="banner">
                    <img src={'/icons_assets/Logo.svg'} alt="logo" /> 
                </header>
                <Nav cssName="app-nav" />
            </div>
        </>
    );
};

export default Header;