// import React from 'react'
// import style from './CategorySlider.module.css'
import {   useQuery} from 'react-query'
import axios from 'axios';
import Slider from 'react-slick';
export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1900,
  };
  async function getCategory(){
    try{
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories `).catch((err)=>err)

    }catch(err){
      console.log(err);
    }
  }
  let {   data    }  = useQuery('CategorySlider', getCategory ,{
    cacheTime:1500,
    refetchOnMount:true,
    staleTime:1500,
    refetchInterval:1500,
    // enabled:=true
  });
  let Info =data?.data?.data;
return <>
<div className='py-4'>
{Info?<Slider {...settings}>
          {Info.map((cate)=> <img key={cate.id} height={200}  style={{objectFit:'cover'}}  src={cate.image} alt={Info.category} className='w-100'/>)}
        </Slider>
:''}
</div>

  </>
}
