import React from 'react';
import HighlightCard from './HighlightCard';

const HighlightSection = () => {
    return (
        <>
            <div className="row main-highlight-section" aria-label="Highlight Section">
                <div className='highlight-section-header'>
                    <div className='highlight-section-label'>
                        This Week Specials!
                    </div>
                    <div className='highlight-section-button'>
                        <button className='btn btn-primary' aria-label="View All Specials">View All</button>
                    </div>
                </div>
                <div className='highlight-section-content'>
                    <HighlightCard
                        id={1}
                        imgSrc={'/icons_assets/greek salad.jpg'}
                        title="Greek Salad"
                        price="$10.00"
                        description="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
                        orderLabel="Order Delivery"
                        orderIcon={'/icons_assets/delivery.png'}
                    />
                    <HighlightCard
                        id={2}
                        imgSrc={'/icons_assets/bruchetta.svg'}
                        title="Bruchetta"
                        price="$5.99"
                        description="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. "
                        orderLabel="Order Delivery"
                        orderIcon={'/icons_assets/delivery.png'}
                    />
                    <HighlightCard
                        id={3}
                        imgSrc={'/icons_assets/lemon dessert.jpg'}
                        title="Lemon Dessert"
                        price="$12.90"
                        description="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
                        orderLabel="Order Delivery"
                        orderIcon={'/icons_assets/delivery.png'}
                    />
                </div>
            </div>
        </>
    );
};

export default HighlightSection;