import React from 'react'
import style from './MainSlider.module.css'
import Slider from 'react-slick'
import slide1 from'../../assets/images/slider-image-1.jpeg'
import slide2 from'../../assets/images/slider-image-2.jpeg'
import slide3 from'../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1900,
    arrows:false,
    
  };
  return <>
  <div className="row gx-0">
    <div className="col-md-9">
    <Slider {...settings}>
              <img height={300} className='w-100' src={slide1} alt="..." />
              <img height={300} className='w-100' src={slide2} alt="..." />
              <img height={300} className='w-100' src={slide3} alt="..." />

        </Slider> 

    </div>
    <div className="col-md-3 ">
    <img height={150} className='w-100' src={blog1} alt="..." />
    <img height={150} className='w-100' src={blog2} alt="..." />
      
    </div>
  </div>
 
  </>
}
