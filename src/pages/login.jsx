import React, {useCallback, useState }from 'react';
import style from './login.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {actionLoginUser} from '../services/actions/user-actions.js'


import {getUser } from '../services/reducers/user-reducer.js'
const Login = ()=>{
    const [formLogin, setFormLogin] = useState({email:"", password: ""})
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    
    const user = useSelector(getUser)
    if (user) {
        navigate(from)
    }
    const login = (e)=>{
        e.preventDefault()
        dispatch(actionLoginUser(formLogin))
    }
    const onChangeForm = useCallback((e)=>{
        if (e.target.name === "email"){
            setFormLogin({...formLogin,email:e.target.value})
        }
        else if (e.target.name === "password"){
            setFormLogin({...formLogin,password:e.target.value})
        }
    })

    return (
        <div className={style.wrapper}>
        <h3>Вход</h3>
        <form  onSubmit={login}>
        <Input 
            type={'text'}
            placeholder={'e-mail'}
            size={'default'}
            extraClass="mb-5"
            name={'email'}
            onChange={onChangeForm}
        />
        <PasswordInput
            name={'password'}
            extraClass="mb-5"
            icon="ShowIcon"
            
            onChange={onChangeForm}
        />
        <Button htmlType="submit" type="primary" size="small" extraClass="ml-2" >
            Войти
        </Button>
        </form>
        <h4>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></h4>
        <h4>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></h4>
        </div>
    )
}

export {Login};