import React, {useCallback, useState } from 'react';
import style from './login.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {actionRegistrationUser} from '../services/actions/user-actions.js'
import {getUser } from '../services/reducers/user-reducer.js'

const Register = ()=>{
    const [formLogin, setFormLogin] = useState({email:"", password: "",name:""})
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(getUser)
    if (user) {
        navigate("/")
    }
    const registration = (e)=>{
        dispatch(actionRegistrationUser(formLogin))
    }
    const onChangeForm = useCallback((e)=>{
        if (e.target.name === "email"){
            setFormLogin({...formLogin,email:e.target.value})
        }
        else if (e.target.name === "password"){
            setFormLogin({...formLogin,password:e.target.value})
        }
        else if (e.target.name === "name"){
            setFormLogin({...formLogin,name:e.target.value})
        }
    })


    return (
        <div className={style.wrapper}>
        <h3>Регистрация</h3>
        <Input 
            type={'text'}
            placeholder={'Имя'}
            size={'default'}
            extraClass="mb-5"         
            name={'name'}
            onChange={onChangeForm}
        />
        <Input 
            type={'text'}
            placeholder={'E-mail'}
            size={'default'}
            extraClass="mb-5"         
            name={'email'}
            onChange={onChangeForm}
        />
        <PasswordInput
            name={'password'}
            placeholder={'Пароль'}
            extraClass="mb-5"
            icon="ShowIcon"
            onChange={onChangeForm}
        />
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={registration}>
            Зарегистрироваться
        </Button>
        <h4 className='mt-10'>Уже зарегистрированы? <Link to="/login">Войти</Link></h4>
        </div>
    )
}

export {Register};