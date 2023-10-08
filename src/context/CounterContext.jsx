import {createContext, useState} from 'react'

export let CounterContext = createContext();

export default function CounterContextProvider(props){
    

    let [Counter ,setCounter] = useState(0); 

    return <CounterContext.Provider value={{Counter , setCounter}}>
        {props.children}
    </CounterContext.Provider>
} 