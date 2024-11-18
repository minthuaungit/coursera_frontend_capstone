import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewSection = () => {
    return (
        <div className="row main-review-section">
            <div className='review-section-header'>
                Customer Reviews
            </div>
            <div className='review-section-content'>
                <ReviewCard
                    name="John Doe"
                    photo="/icons_assets/profile1.webp"
                    review="Amazing food! The Greek Salad was fresh and delicious."
                />
                <ReviewCard
                    name="Jane Smith"
                    photo="/icons_assets/profile2.webp"
                    review="The Bruchetta was fantastic. Highly recommend!"
                />
                <ReviewCard
                    name="Emily Johnson"
                    photo="/icons_assets/profile3.png"
                    review="Loved the Lemon Dessert. It was the perfect end to a great meal."
                />
                <ReviewCard
                    name="Michael Brown"
                    photo="/icons_assets/profile4.webp"
                    review="Great atmosphere and friendly staff. Will visit again!"
                />
            </div>
        </div>
    );
};

export default ReviewSection;