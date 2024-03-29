// @ts-check
import React from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { StyledImgContainer } from "..";

/**
 * 
 * @param {import("react").PropsWithChildren<{ slideSrcList: string[] }>} props 
 * @returns 
 */
export default function MainBanner({ slideSrcList }) {
  
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 8000 }}
      style={{ borderRadius: "6px" }}
      loop={true}
    >
      {slideSrcList.map((src) => (
        <SwiperSlide key={src}>
          <Link to="/">
            <StyledImgContainer>
              <img src={src} alt="banner" />
            </StyledImgContainer>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
