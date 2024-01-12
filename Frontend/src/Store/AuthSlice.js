import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    allUsers: [],
}


export const AuthSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
    }

})

export const { setAuth, setAllUsers } = AuthSlice.actions

export default AuthSlice.reducer