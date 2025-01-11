import React from 'react';
import HeroSection from './components/HeroSection';
import HighlightSection from './components/HighlightSection';
import ReviewSection from './components/ReviewSection';
import AboutSection from './components/AboutSection';

const MainContent = () => {
    return (
        <>
            <HeroSection />
            <HighlightSection />
            <ReviewSection />
            <AboutSection />
        </>
    );
};

export default MainContent;