import React,{FC, SyntheticEvent, useCallback, useState } from 'react';
import style from './login.module.css'
import { PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {actionResetPassword} from '../services/actions/user-actions'
import {getSendCodeResetPassword, getUser} from '../services/reducers/user-reducer'
import { useAppDispatch } from '../services/store/app-dispath';

const ResetPassword: FC = ()=>{
    const [formLogin, setFormLogin] = useState({password:"",code:""})
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const sendCodeResetPassword = useSelector(getSendCodeResetPassword)
    const user = useSelector(getUser)
    if (user) {
        navigate("/")
    }
    if (!sendCodeResetPassword) {
        navigate("/login")
    }
    const resetPassword = (e:SyntheticEvent)=>{
        e.preventDefault()
        dispatch(actionResetPassword(formLogin))
    }
    const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.name === "password"){
            setFormLogin({...formLogin,password:e.target.value})
        }
        else if (e.target.name === "code"){
            setFormLogin({...formLogin,code:e.target.value})
        }
    },[formLogin])


    return (
        <div className={style.wrapper}>
        <h3>Восстановление пароля</h3>
        <form  onSubmit={resetPassword}>
        <PasswordInput 
            value={formLogin.password}
            placeholder={'Введите новый пароль'}
            size={'default'}
            extraClass="mb-5"         
            name={'password'}
            icon="ShowIcon"
            onChange={onChangeForm}
        />        
        <PasswordInput 
            value={formLogin.code}
            placeholder={'Введите код из письма'}
            size={'default'}
            extraClass="mb-5"         
            name={'code'}
            onChange={onChangeForm}
        />
        <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
            Сохранить
        </Button>
        </form>
        <h4 className='mt-10'>Вспомнили пароль? <Link to="/login">Войти</Link></h4>
        </div>
    )
}

export {ResetPassword};