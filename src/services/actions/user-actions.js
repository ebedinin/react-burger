import {createAsyncThunk} from '@reduxjs/toolkit'
import {authorization, registration,logout, getUser, forgotPassword, resetPassword, changeUser} from '../api/user-api.js'
const actionLoginUser = createAsyncThunk("USER/LOGIN",
    async  (account)=>{
	    return authorization(account.email, account.password);
    }
);
const actionRegistrationUser = createAsyncThunk("USER/REGISTRATION",
    async (formLogin)=>{
	    return registration(formLogin.email, formLogin.password, formLogin.name);
    }
);
const actionForgotPassword = createAsyncThunk("USER/FORGOT-PASSWORD",
    async (formLogin)=>{
	    return forgotPassword(formLogin.email);
    }
);
const actionResetPassword = createAsyncThunk("USER/RESET-PASSWORD",
    async (formLogin)=>{
	    return resetPassword(formLogin.password, formLogin.code);
    }
);
const actionLogoutUser = createAsyncThunk("USER/LOGOUT",
    async ()=>{
	    return logout();
    }
);
const actionGetUser = createAsyncThunk("USER/GET",
    async ()=>{
        
	    return getUser();
    }
);

const actionChangeUser = createAsyncThunk("USER/CHANGE",
    async (user)=>{
	    return changeUser(user);
    }
);
export {actionLoginUser, actionRegistrationUser, actionLogoutUser, actionGetUser,actionForgotPassword,actionResetPassword,actionChangeUser}