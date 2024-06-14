import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { signIn } from "../../services"

const initial = {
    login: false,
    token: ''
}

export const signinRequest = createAsyncThunk("Auth/Signin", async (signInRequest) => {
    const response = await signIn(signInRequest)
    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data))
    }
    return response.data
})

const AuthSlice = createSlice({
    name: "Auth",

    initialState: initial,

    reducers: {
        logOut: state => {
            if (state.login) {
                localStorage.removeItem("token")
            }
            return initial
        }
    },

    extraReducers: (builder) => {
        builder.addCase(signinRequest.fulfilled, (state, action) => {
            return { ...state, login: true, token: action.payload }
        })
    }

})

export const { logOut, checkUser } = AuthSlice.actions
export default AuthSlice.reducer