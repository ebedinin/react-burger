import React,{useCallback, useState } from 'react';
import style from './login.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {actionForgotPassword} from '../services/actions/user-actions.js'
import {getSendCodeResetPassword, getUser } from '../services/reducers/user-reducer.js'
const ForgotPassword = ()=>{
    const [formLogin, setFormLogin] = useState({email:""})
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const sendCodeResetPassword = useSelector(getSendCodeResetPassword)
    const user = useSelector(getUser)
    if (user) {
        navigate("/")
    }
    if (sendCodeResetPassword) {
        navigate("/reset-password")
    }
    const forgotPassword = (e)=>{
        dispatch(actionForgotPassword(formLogin))
    }
    const onChangeForm = useCallback((e)=>{
        if (e.target.name === "email"){
            setFormLogin({...formLogin,email:e.target.value})
        }
    })

    return (
        <div className={style.wrapper}>
        <h3>Восстановление пароля</h3>
        <Input 
            type={'text'}
            placeholder={'E-mail'}
            size={'default'}
            extraClass="mb-5"         
            name={'email'}
            onChange={onChangeForm}
        />
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={forgotPassword}>
            Восстановить
        </Button>
        <h4 className='mt-10'>Вспомнили пароль? <Link to="/login">Войти</Link></h4>
        </div>
    )
}

export {ForgotPassword};