import {configureStore} from '@reduxjs/toolkit'
import { ConterReducer } from './CounterSlice'
import { categoriesReducer } from './CategoriesSlice'
import { BrandReducer } from './BrandSlice'

export let store = configureStore({
    //reducer
    reducer:{
        //slices
        counter:ConterReducer,
        categories:categoriesReducer,
        brands:BrandReducer
    }
})