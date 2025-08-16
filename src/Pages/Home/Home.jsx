import React from 'react';

import HowItWorks from '../../components/HowItWork/HowItWorks';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import SuccessStory from '../../components/SuccessStory/SuccessStory';
import SuccessCounter from '../../components/SuccessCounter/successCounter';
import PremiumBiodata from '../../components/PremiumBiodata/PremiumBiodata';
import MatchingQuiz from '../../components/MatchingQuiz/MatchingQuiz';


const Home = () => {
    return (
        <div>
            <BannerSlider/>
            <PremiumBiodata/>
            <HowItWorks/>
            <SuccessCounter/>
            <SuccessStory/>
            <MatchingQuiz/>
            
        </div>
    );
};

export default Home;