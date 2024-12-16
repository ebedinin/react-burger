import {createSlice} from '@reduxjs/toolkit'
import {actionLoginUser, actionRegistrationUser, actionLogoutUser, actionGetUser, actionForgotPassword,actionResetPassword,actionChangeUser} from '../actions/user-actions'
import { TUser } from '../api/type/user.js'

const initialState={
    isAuthorizationProcess: true,
    isErrorAuthorization: false,
    isRegistrationProcess: true,
    isErrorRegistration: false,
    isLogoutProcess: true,
    isErrorLogout: false,
    isGetUserProcess: true,
    isErrorGetUser: false,
    isSendCodeResetPassword: false,
    data: null as TUser | null
}
export type TState = typeof initialState
const sliceUser = createSlice({
    name:"user",
    reducerPath: "user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(actionLoginUser.pending,(state)=>{
                state.isAuthorizationProcess = true
            })
            .addCase(actionLoginUser.rejected, (state,)=>{
                state.isAuthorizationProcess=false
                state.isErrorAuthorization=true
                state.data = null
            })
            .addCase(actionLoginUser.fulfilled, (state,action)=>{
                state.isAuthorizationProcess = false
                state.isErrorAuthorization = false
                state.data = action.payload.user
            })
            .addCase(actionRegistrationUser.pending,(state)=>{
                state.isRegistrationProcess = true
            })
            .addCase(actionRegistrationUser.rejected, (state)=>{
                state.isRegistrationProcess=false
                state.isErrorRegistration=true
                state.data = null
            })
            .addCase(actionRegistrationUser.fulfilled, (state,action)=>{
                state.isRegistrationProcess = false
                state.isErrorRegistration = false
                state.data = action.payload.user
            })
            .addCase(actionLogoutUser.pending,(state)=>{
                state.isLogoutProcess = true
            })
            .addCase(actionLogoutUser.rejected, (state)=>{
                state.isLogoutProcess=false
                state.isErrorLogout=true
                state = initialState
            })
            .addCase(actionLogoutUser.fulfilled, (state)=>{
                state.isLogoutProcess = false
                state.data = null
            })
            .addCase(actionGetUser.pending,(state)=>{
                state.isGetUserProcess = true
            })
            .addCase(actionGetUser.rejected, (state)=>{
                state.isGetUserProcess=false
                state.isErrorGetUser=true
            })
            .addCase(actionGetUser.fulfilled, (state,action)=>{
                state.isGetUserProcess = false
                state.data = action.payload.user
            })
            .addCase(actionChangeUser.pending,(state)=>{
                state.isGetUserProcess = true
            })
            .addCase(actionChangeUser.rejected, (state)=>{
                state.isGetUserProcess=false
                state.isErrorGetUser=true
            })
            .addCase(actionChangeUser.fulfilled, (state,action)=>{
                state.isGetUserProcess = false
                state.data = action.payload.user
            })
            .addCase(actionForgotPassword.rejected, (state)=>{
                state.isSendCodeResetPassword= false
            })
            .addCase(actionForgotPassword.fulfilled, (state,action)=>{
                if (action.payload.success && action.payload.message === "Reset email sent"){
                    state.isSendCodeResetPassword= true
                }
                else{
                    state.isSendCodeResetPassword= false
                }
            })
            .addCase(actionResetPassword.rejected, (state,action)=>{
                state.isSendCodeResetPassword= false
            })
            .addCase(actionResetPassword.fulfilled, (state,action)=>{
                if (action.payload.success)
                    state.isSendCodeResetPassword= false
            })
    },
    selectors:{
        getAuthorizationProcess: (state)=> state.isAuthorizationProcess,
        getErrorAuthorization: (state)=> state.isErrorAuthorization,
        getRegistrationProcess: (state)=> state.isRegistrationProcess,
        getErrorRegistration: (state)=> state.isErrorRegistration,
        getRefreshTokenProcess: (state)=> state.isRegistrationProcess,
        getErrorRefreshToken: (state)=> state.isErrorRegistration,
        getLogoutProcess: (state)=> state.isLogoutProcess,
        getErrorLogout: (state)=> state.isErrorLogout,
        getGetUserProcess: (state)=> state.isGetUserProcess,
        getErrorGetUser: (state)=> state.isErrorGetUser,
        getSendCodeResetPassword: (state)=> state.isSendCodeResetPassword,
        getUser: (state)=> state.data
    }
})

export const {getAuthorizationProcess, getErrorAuthorization, getRegistrationProcess, getErrorRegistration, 
    getRefreshTokenProcess, getErrorRefreshToken, getLogoutProcess, getErrorLogout, getGetUserProcess, 
    getErrorGetUser, getUser,getSendCodeResetPassword} = sliceUser.selectors;
export const reducerUser = sliceUser.reducer;