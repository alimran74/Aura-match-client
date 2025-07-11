import React from 'react';
import BannerSlider from '../BannerSlider/BannerSlider';
import FeaturedPremium from '../FeaturedPremium/FeaturedPremium';
import HowItsWorks from './HowItsWork/HowItsWorks';

const Home = () => {
    return (
        <div>
            <BannerSlider/>
            <FeaturedPremium/>
            <HowItsWorks/>
        </div>
    );
};

export default Home;