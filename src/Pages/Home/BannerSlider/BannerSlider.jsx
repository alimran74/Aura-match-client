import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import bannerImg1 from '../../../assets/Banner1.jpg';
import bannerImg2 from '../../../assets/Banner2.jpg';
import bannerImg3 from '../../../assets/Banner3.jpg';
import bannerImg4 from '../../../assets/Banner4.jpg';

const BannerSlider = () => {
  return (
    <div className="w-full max-h-[500px] overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={4000}
        transitionTime={700}
        swipeable={true}
        emulateTouch={true}
      >
        {[bannerImg1, bannerImg2, bannerImg3, bannerImg4].map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt={`Banner ${idx + 1}`}
              className="w-full h-[300px] md:h-[450px] object-cover object-center rounded"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSlider;
