import React, {FC, SyntheticEvent, useCallback, useState } from 'react';
import style from './login.module.css'
import { Input, PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {actionRegistrationUser} from '../services/actions/user-actions'
import {getUser } from '../services/reducers/user-reducer'
import { useAppDispatch } from '../services/store/app-dispath';

const Register: FC = ()=>{
    const [formLogin, setFormLogin] = useState({email:"", password: "",name:""})
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser)
    if (user) {
        navigate("/")
    }
    const registration = (e:SyntheticEvent)=>{
        e.preventDefault()
        dispatch(actionRegistrationUser(formLogin))
    }
    const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.name === "email"){
            setFormLogin({...formLogin,email:e.target.value})
        }
        else if (e.target.name === "password"){
            setFormLogin({...formLogin,password:e.target.value})
        }
        else if (e.target.name === "name"){
            setFormLogin({...formLogin,name:e.target.value})
        }
    },[formLogin])


    return (
        <div className={style.wrapper}>
        <h3>Регистрация</h3>
        <form  onSubmit={registration}>
        <EmailInput 
            value={formLogin.name}
            placeholder={'Имя'}
            size={'default'}
            extraClass="mb-5"         
            name={'name'}
            onChange={onChangeForm}
        />
        <EmailInput 
            value={formLogin.email}
            placeholder={'E-mail'}
            size={'default'}
            extraClass="mb-5"         
            name={'email'}
            onChange={onChangeForm}
        />
        <PasswordInput
            value={formLogin.password}
            name={'password'}
            placeholder={'Пароль'}
            extraClass="mb-5"
            icon="ShowIcon"
            onChange={onChangeForm}
        />
        <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
            Зарегистрироваться
        </Button>
        </form>
        <h4 className='mt-10'>Уже зарегистрированы? <Link to="/login">Войти</Link></h4>
        </div>
    )
}

export {Register};