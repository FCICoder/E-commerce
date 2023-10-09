import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getBrands = createAsyncThunk('brandSllice/brands',
async ()=>{
  let {data} = await axios.get(`https:ecommerce.routemisr.com/api/v1/brands`)
    return data.data
});

let initialState = {
    brands: [],
    loading:false,
    isError:null
    }

let brandSlice=createSlice({
    name: 'brandSllice',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getBrands.fulfilled,(state,action)=>{
            state.brands = action.payload;
            state.loading = false;
        }),
        builder.addCase(getBrands.pending , (state)=>{
            state.loading = true;
        }),
        builder.addCase(getBrands.rejected , (state)=>{
            state.loading = false;
        })
        
        // [getBrands.pending]:(state , action)=>{
        //     state.loading = true;
        // },
        // [getBrands.fulfilled]:(state , action)=>{
        //     state.brands = action.payload;
        //     state.loading = false;
        // },
        // [getBrands.rejected]:(state , action)=>{
        //     // state.isError = action.payload;
        //     state.loading = false;
        // }
    }
})

export let BrandReducer = brandSlice.reducer;