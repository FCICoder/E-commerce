import { useEffect } from 'react'
// import style from './Brands.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';
import { getBrands } from '../../Redux/BrandSlice';



export default function Brands() {
  let {loading , brands}  = useSelector((state)=>state.brands);
 

  let dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBrands())
  },[])
  
  // useQuery
  return <>
   
    {loading?<div className='w-100 bg-dark bg-opacity-50 w-100 py-5 d-flex justify-content-center align-items-center' style={{height:500}}>
    <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
    </div>:<div className="row g-3">
      {brands?.map((brand)=>
      <div key={brand._id} className="col-md-3  ">
  
          <div className="Brands cursor-pointer product overflow-hidden ">
            <img className='w-100' src={brand.image} alt={brand.slug} />
            <h4 className='h4 my-1 text-center bg-dark text-light'>{brand.name}</h4>
          </div>
  
        </div>    
      )}
      
      </div>
    
    }
    </>
}
