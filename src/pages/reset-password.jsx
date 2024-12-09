import React,{useCallback, useState } from 'react';
import style from './login.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {actionResetPassword} from '../services/actions/user-actions.js'
import {getSendCodeResetPassword, getUser} from '../services/reducers/user-reducer.js'

const ResetPassword = ()=>{
    const [formLogin, setFormLogin] = useState({password:"",code:""})
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const sendCodeResetPassword = useSelector(getSendCodeResetPassword)
    const user = useSelector(getUser)
    if (user) {
        navigate("/")
    }
    if (!sendCodeResetPassword) {
        navigate("/login")
    }
    const resetPassword = (e)=>{
        console.log(formLogin)
        dispatch(actionResetPassword(formLogin))
    }
    const onChangeForm = useCallback((e)=>{
        console.log(e)
        console.log(formLogin)
        if (e.target.name === "password"){
            setFormLogin({...formLogin,password:e.target.value})
        }
        else if (e.target.name === "code"){
            setFormLogin({...formLogin,code:e.target.value})
        }
    })


    return (
        <div className={style.wrapper}>
        <h3>Восстановление пароля</h3>
        <PasswordInput 
            type={'text'}
            placeholder={'Введите новый пароль'}
            size={'default'}
            extraClass="mb-5"         
            name={'password'}
            icon="ShowIcon"
            onChange={onChangeForm}
        />        
        <Input 
            type={'text'}
            placeholder={'Введите код из письма'}
            size={'default'}
            extraClass="mb-5"         
            name={'code'}
            onChange={onChangeForm}
        />
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={resetPassword}>
            Сохранить
        </Button>
        <h4 className='mt-10'>Вспомнили пароль? <Link to="/login">Войти</Link></h4>
        </div>
    )
}

export {ResetPassword};