import React from 'react';

const ReviewCard = ({ name, photo, review }) => {
    return (
        <div className='review-card'>
            <div className='card-title'>{name}</div>
            <div className='card-photo-name'>
                <img src={photo} alt={name} />
                <div className='lbl-normal'>{name}</div>
            </div>
            <div className='card-review'>
                {review}
            </div>
        </div>
    );
};

export default ReviewCard;