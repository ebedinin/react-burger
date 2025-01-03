import React,{SyntheticEvent, useCallback, useState } from 'react';
import style from './login.module.css'
import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {actionForgotPassword} from '../services/actions/user-actions'
import {getSendCodeResetPassword, getUser } from '../services/reducers/user-reducer'
import { useAppDispatch } from '../services/store/app-dispath';
const ForgotPassword = ()=>{
    const [formLogin, setFormLogin] = useState({email:""})
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const sendCodeResetPassword = useSelector(getSendCodeResetPassword)
    const user = useSelector(getUser)
    if (user) {
        navigate("/")
    }
    if (sendCodeResetPassword) {
        navigate("/reset-password")
    }
    const forgotPassword = (e:SyntheticEvent)=>{
        e.preventDefault()
        dispatch(actionForgotPassword(formLogin))
    }
    const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.name === "email"){
            setFormLogin({...formLogin,email:e.target.value})
        }
    },
    [formLogin])

    return (
        <div className={style.wrapper}>
        <h3>Восстановление пароля</h3>
        <form  onSubmit={forgotPassword}>
        <EmailInput 
            value={formLogin.email}
            placeholder={'E-mail'}
            size={'default'}
            extraClass="mb-5"         
            name={'email'}
            onChange={onChangeForm}
        />
        <Button htmlType="submit" type="primary" size="small" extraClass="ml-2" >
            Восстановить
        </Button>
        </form>
        <h4 className='mt-10'>Вспомнили пароль? <Link to="/login">Войти</Link></h4>
        </div>
    )
}

export {ForgotPassword};