import React from 'react';
import HeroSection from './HeroSection';
import HighlightSection from './HighlightSection';
import ReviewSection from './ReviewSection';
import AboutSection from './AboutSection';
import FooterNavSection from './FooterNavSection';


const MainContent = () => {
    return (
        <div>
           <HeroSection />
            <HighlightSection />
            <ReviewSection />
            <AboutSection />
            <FooterNavSection />
        </div>
    );
};

export default MainContent;