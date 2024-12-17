import {createAsyncThunk} from '@reduxjs/toolkit'
import {authorization, registration,logout, getUser, forgotPassword, resetPassword, changeUser} from '../api/user-api'
import { TResponseLogin, TResponseSession, TResponseUser } from '../api/type/user';
const actionLoginUser = createAsyncThunk<TResponseLogin,{email:string,password:string}>("USER/LOGIN",
    async  (account)=>{
        console.log(account)
	    return authorization(account.email, account.password);
    }
);
const actionRegistrationUser = createAsyncThunk<TResponseLogin,{email:string,password:string,name:string}>("USER/REGISTRATION",
    async (formLogin)=>{
	    return registration(formLogin.email, formLogin.password, formLogin.name);
    }
);
const actionForgotPassword = createAsyncThunk<TResponseSession,{email:string}>("USER/FORGOT-PASSWORD",
    async (formLogin)=>{
	    return forgotPassword(formLogin.email);
    }
);
const actionResetPassword = createAsyncThunk<TResponseSession,{password:string,code:string}>("USER/RESET-PASSWORD",
    async (formLogin)=>{
	    return resetPassword(formLogin.password, formLogin.code);
    }
);
const actionLogoutUser = createAsyncThunk<TResponseSession>("USER/LOGOUT",
    async ()=>{
	    return logout();
    }
);
const actionGetUser = createAsyncThunk<TResponseUser>("USER/GET",
    async ()=>{        
	    return getUser();
    }
);

const actionChangeUser = createAsyncThunk<TResponseUser,{email:string, name:string}>("USER/CHANGE",
    async (user)=>{
	    return changeUser(user.email,user.name);
    }
);
export {actionLoginUser, actionRegistrationUser, actionLogoutUser, actionGetUser,actionForgotPassword,actionResetPassword,actionChangeUser}