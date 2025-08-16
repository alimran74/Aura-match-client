import React from 'react';

import HowItWorks from '../../components/HowItWork/HowItWorks';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import SuccessStory from '../../components/SuccessStory/SuccessStory';
import SuccessCounter from '../../components/SuccessCounter/successCounter';
import PremiumBiodata from '../../components/PremiumBiodata/PremiumBiodata';
import MatchingQuiz from '../../components/MatchingQuiz/MatchingQuiz';
import BenefitsSection from '../../components/Benefits/BenefitsSection';
import HeroSection from '../../components/HeroSection/HeroSection';
import FAQSection from '../../components/FAQSection/FAQSection';


const Home = () => {
    return (
        <div>
            <BannerSlider/>
            <PremiumBiodata/>
            <HowItWorks/>
            <MatchingQuiz/>
            <SuccessStory/>
            <BenefitsSection/>
            <SuccessCounter/>
            <FAQSection/>
            <HeroSection/>
            
            
        </div>
    );
};

export default Home;