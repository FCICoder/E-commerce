// import style from './Categories.module.css'
import { getCategories } from '../../Redux/CategoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
// import { useQuery } from 'react-query'
import { ColorRing } from 'react-loader-spinner';
import { useEffect } from 'react';


export default function Categories() {
let {loading , isError , categories}  = useSelector((state)=>state.categories)

let dispatch = useDispatch();
useEffect(()=>{
  dispatch(getCategories())
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
  </div>:<div className="row">
    {categories?.map((category)=><div key={category._id} className="col-md-3  ">

        <div className="category cursor-pointer  product overflow-hidden ">
          <img className='w-100'  height={350} src={category.image} alt={category.slug} />
          <h4 className='h4 my-1 text-center bg-dark text-light'>{category.name}</h4>
        </div>

      </div>    
    )}
    
    </div>
  
  }
  </>
}
