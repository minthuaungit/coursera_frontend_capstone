import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <>
            <div className="row main-hero-section">
                <div className='left-hero'>
                    <div className='lbl-header lemon-color pd-top-40'>
                        Little Lemon
                    </div>
                    <div className='lbl-page-header whitesmoke-color pd-top-10'>
                        Chicago
                    </div>
                    <div className='lbl-normal whitesmoke-color'>
                        We are a family owned <br />
                        Mediterranean restaurant,<br />
                        focused on traditional<br />
                        recipes served with a modern<br />
                        twist.
                    </div>
                    <div className='pd-top-15 pd-btm-15'>
                        <Link to="/reservation" className='btn btn-primary'>Reserve Table</Link>
                    </div>
                </div>
                <div className='right-hero'>
                    <img src={'/icons_assets/restauranfood.jpg'} alt="food" />
                </div>
            </div>
        </>
    );
};

export default HeroSection;