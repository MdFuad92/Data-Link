import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style/banner.css';

// import required modules
import {Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const CouponCarousel = () => {
    const axiosSecure = useAxiosSecure()
    const { data: coupon, isPending } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupon')
            return res.data
        }
    })
   
    if (isPending) {
        return <span className="loading loading-spinner loading-xs"></span>
    }
    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={30}
                centeredSlides={true}
                speed={600}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                parallax={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay,Parallax, Pagination, Navigation]}
                className="mySwiper"
            >
                <div
                    slot="container-start"
                    className="parallax-bg"
                  
                    data-swiper-parallax="-23%"
                ></div>
                {coupon.map(c =>

            
                      <SwiperSlide key={c._id} >
                        <div className="title" data-swiper-parallax="-300">
                           GET DISCOUNT NOW
                        </div>
                        <div className="subtitle" data-swiper-parallax="-200">
                          USE: {c.coupon_code}
                        </div>
                        <div className="text" data-swiper-parallax="-100">
                            <div>
                                <p>
                                {c.coupon_description}
                                </p>
                                <p>
                                Expiry-Date: {c.expiry_date}
                                </p>
                                <p>
                               Discount: {c.amount}%
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
          
                )

                }

            </Swiper>
        </>
    );
};

export default CouponCarousel;