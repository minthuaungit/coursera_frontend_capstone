import React from 'react';

const HighlightCard = ({ id, imgSrc, title, price, description, orderLabel, orderIcon }) => {
    const handleClick = () => {
        console.log(`Card with id ${id} clicked`);
    };

    return (
        <div className='item-container' onClick={handleClick}>
            <div className='photo-section'>
                <img src={imgSrc} alt="food" />
            </div>
            <div className='content-section'>
                <div className='header'>
                    <div className='card-title'>
                        {title}
                    </div>
                    <div className='price lemon-color'>
                        {price}
                    </div>
                </div>
                <div className='info'>
                    {description}
                </div>
                <div className='footer'>
                    <div className='label'>
                        {orderLabel}
                    </div>
                    <div className='icon'>
                        <img src={orderIcon} alt="delivery" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HighlightCard;