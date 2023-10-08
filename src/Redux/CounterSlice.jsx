import { createSlice } from "@reduxjs/toolkit";

let initialState = {counter : 0, name:''}

let counterSlice=createSlice({
    name:"CounterSliiiicce",
    initialState,
    reducers:{
        increaseCounter:(state,action)=>{
            console.log("increase");
            state.counter += 1;
        },
        decreaseCounter:(state,action)=>{
            console.log("deacreaas");
            state.counter -= 1;
        },
        increaseByAmount(state,action){
            console.log(action.payload);
            state.counter += action.payload;
        }
    }
})

export let ConterReducer = counterSlice.reducer;
export let {increaseCounter,decreaseCounter ,increaseByAmount} = counterSlice.actions;