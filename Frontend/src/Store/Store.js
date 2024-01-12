import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import ProductsSlice from './ProductsSlice'

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        products: ProductsSlice,
    }
})