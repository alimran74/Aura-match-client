import React from 'react';

import HowItWorks from '../../components/HowItWork/HowItWorks';
import BannerSlider from '../../components/BannerSlider/BannerSlider';
import SuccessStory from '../../components/SuccessStory/SuccessStory';

const Home = () => {
    return (
        <div>
            <BannerSlider/>
            <HowItWorks/>
            <SuccessStory/>
        </div>
    );
};

export default Home;