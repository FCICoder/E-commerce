import React, { useEffect, useMemo, useState } from 'react'
import style from './Products.module.css'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { increaseCounter , decreaseCounter,increaseByAmount} from '../../Redux/CounterSlice'


export default function Products() {
// let dispatch = useDispatch()
// let {counter} = useSelector((state)=>state.counter)

let [counter1 ,setCounter1] = useState(0);
let [counter2 ,setCounter2] = useState(0);


function increaseCounter1(){
  setCounter1(counter1 +=1);
}

 function increaseCounter2(){
  setCounter2(counter2 +=1);
}
let check = useMemo(()=>{
  console.log("check 2222");
return counter2 % 2===0
},[counter2])
return <>
<Helmet>
  <title>Products</title>
</Helmet>

  <h1>Counter1 : {counter1}</h1>

  <button className='btn btn-info' onClick={()=>increaseCounter1()}>Increase</button>
  {/* <button className='btn btn-info' onClick={()=>dispatch(decreaseCounter())}>decreaas</button>
  <button className='btn btn-info' onClick={()=>dispatch(increaseByAmount(30))}>incraseBy amount</button> */}
<h1>Counter2 : {counter2}</h1>
<h5>{check?'even':'odd'}</h5>
<button className='btn btn-info' onClick={()=>increaseCounter2()}>Increase</button>


  </>
}
