import React from 'react';

import HowItWorks from '../../components/HowItWork/HowItWorks';
import BannerSlider from '../../components/BannerSlider/BannerSlider';

const Home = () => {
    return (
        <div>
            <BannerSlider/>
            <HowItWorks/>
        </div>
    );
};

export default Home;