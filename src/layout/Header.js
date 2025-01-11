
import React from 'react';
import Nav from './components/Nav';

const Header = () => {
    return (
        <>
            <div className="main-app-header-grid">
                <header className='app-header'>
                    <img src={'/icons_assets/Logo.svg'} alt="logo" />
                </header>
                <Nav cssName="app-nav" />
            </div>
        </>
    );
};

export default Header;