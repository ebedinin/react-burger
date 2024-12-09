import React, {useState, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {getUser} from '../services/reducers/user-reducer.js'
import {actionChangeUser} from '../services/actions/user-actions.js'

const Profile = ()=>{
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const [formLogin, setFormLogin] = useState({name:user&&user.name,email:user&&user.email, password: ""})
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
    const changeUser = (e)=>{
        dispatch(actionChangeUser(formLogin))
    }
    const restorUser = (e)=>{
        setFormLogin({name:user&&user.name,email:user&&user.email, password: ""})
    }
    const isEdit = user && (formLogin.name !== user.name || formLogin.email !== user.email)
    return (  
        <>
        {user&& <form>
        <Input 
            type={'text'}
            placeholder={'Имя'}
            size={'default'}
            extraClass="mb-5"         
            name={'name'}
            icon="EditIcon"
            value={formLogin.name}
            onChange={onChangeForm}
        />
        <Input 
            type={'text'}
            placeholder={'Логин'}
            size={'default'}
            extraClass="mb-5"         
            name={'email'}
            icon="EditIcon"
            value={formLogin.email}
            onChange={onChangeForm}
        />
        <PasswordInput
            name={'password'}
            extraClass="mb-5"
            icon="EditIcon"
            value={formLogin.password}
            onChange={onChangeForm}
        />
        {isEdit&& <>
            <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={changeUser}>
            Сохранить
        </Button>
            <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={restorUser}>
            Отменить
        </Button>
            </>}
        </form>
        }        
        </>     
    )
}

export {Profile};