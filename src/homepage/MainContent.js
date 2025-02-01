import React from 'react';
import HeroSection from './components/HeroSection';
import HighlightSection from './components/HighlightSection';
import ReviewSection from './components/ReviewSection';
import AboutSection from './components/AboutSection';

const MainContent = () => {
    return (
        <>
            <HeroSection aria-label="Hero Section" />
            <HighlightSection aria-label="Highlight Section" />
            <ReviewSection aria-label="Review Section" />
            <AboutSection aria-label="About Section" />
        </>
    );
};

export default MainContent;