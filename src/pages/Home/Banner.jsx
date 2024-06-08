import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style/banner.css';

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';


import banner1 from '../../assets/anton-maksimov-5642-su-MSzGw5V0ui8-unsplash.jpg'
import banner2 from '../../assets/aron-visuals-bZZp1PmHI0E-unsplash.jpg'
import banner3 from '../../assets/boliviainteligente-VimHVpBr-9E-unsplash.jpg'


// import required modules


const Banner = () => {

    return (
     <>
  <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            'background-image':
              `url(${banner1})`,
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
          Data-link
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
          Explore Cutting-Edge Products
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
            Stay ahead of the curve with the newest and most innovative products in tech. Our curated list features the latest apps, gadgets, and tools designed to enhance your daily life.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
          Data-link
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
          Meet the Creators
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
            Get to know the minds behind the products you love. Connect with founders and developers, learn about their journeys, and be inspired by their stories and insights.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Data-link
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
          Join a Community of Innovators
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
            Engage with a vibrant community of tech enthusiasts, early adopters, and thought leaders. Share your feedback, support groundbreaking projects, and help shape the future of technology.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
   
      </>
    );
};

export default Banner;