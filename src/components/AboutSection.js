import React from 'react';

const AboutSection = () => {
    return (
        <div className="row main-about-section">
            <div className='about-writeup'>
                <div className='lbl-header black-color'>
                    About Us
                </div>
                <div className='lbl-normal black-color pd-top-10'>
                    Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. The restaurant features a locally sourced menu with daily specials.
                </div>
            </div>
            <div className='about-photos'>
                <img src={'/icons_assets/Mario and Adrian A.jpg'} alt="Restaurant" />
                <img src={'/icons_assets/Mario and Adrian b.jpg'} alt="Chef" />
            </div>
        </div>
    );
};

export default AboutSection;