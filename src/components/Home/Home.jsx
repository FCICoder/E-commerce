// import style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from'../CategorySlider/CategorySlider'
import MainSlider from'../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'
export default function Home() {
  


  return <>
        <Helmet>
            <title>Home</title>
        </Helmet>
  <MainSlider/>
  <CategorySlider/>
  <FeaturedProducts/>  
  </>
}
