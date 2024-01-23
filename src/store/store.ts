import {combineReducers, configureStore} from "@reduxjs/toolkit";
import App from "../App";
import bookReducer from './reducers/BookSlice'


const rootReducer  = combineReducers({
    bookReducer
})

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']