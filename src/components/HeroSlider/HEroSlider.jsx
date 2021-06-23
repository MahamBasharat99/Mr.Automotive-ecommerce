import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import slide2 from "../../assets/images/banner/bicycle.jpg"
import slide3 from "../../assets/images/banner/slide3.jpg"
import slide1 from "../../assets/images/banner/tier.jpg"
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const HeroSlider = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      pagination={{  clickable: true }}
      className="heroSlider"
      navigation
      >
      <SwiperSlide className="heroSliderimgs"><img src={slide3} alt="" /></SwiperSlide>
      <SwiperSlide className="heroSliderimgs"><img src={slide2} alt="" /></SwiperSlide>
      <SwiperSlide className="heroSliderimgs"><img src={slide1} alt="" /></SwiperSlide>

      ...
    </Swiper>
  );
};

export default HeroSlider;