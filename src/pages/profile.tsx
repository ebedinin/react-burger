import React, {useState, useCallback, SyntheticEvent, FC} from 'react';
import { useSelector } from 'react-redux';
import { PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import {getUser} from '../services/reducers/user-reducer'
import {actionChangeUser} from '../services/actions/user-actions'
import { useAppDispatch } from '../services/store/app-dispath';

const Profile:FC = ()=>{
    const user = useSelector(getUser)
    const dispatch = useAppDispatch();
    const [formUser, setFormUser] = useState({name:user?user.name:"",email:user?user.email:""})
    const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.name === "email"){
            setFormUser({...formUser,email:e.target.value})
        }
        else if (e.target.name === "password"){
        }
        else if (e.target.name === "name"){
            setFormUser({...formUser,name:e.target.value})
        }
    },[])
    const changeUser = (e:SyntheticEvent)=>{
        e.preventDefault()
        dispatch(actionChangeUser(formUser))
    }
    const restorUser = (e:SyntheticEvent)=>{
        user&&setFormUser({name:user.name,email:user.email})
    }
    const isEdit = user && (formUser.name !== user.name || formUser.email !== user.email)
    return (  
        <>
        {user&& <form onSubmit={changeUser}>
        <EmailInput 
            placeholder={'Имя'}
            size={'default'}
            extraClass="mb-5"         
            name={'name'}
            value={formUser.name}
            onChange={onChangeForm}
        />
        <EmailInput 
            placeholder={'Логин'}
            size={'default'}
            extraClass="mb-5"         
            name={'email'}
            value={formUser.email}
            onChange={onChangeForm}
        />
        <PasswordInput
            name={'password'}
            extraClass="mb-5"
            icon="EditIcon"
            value={""}
            disabled={true}
            onChange={onChangeForm}
        />
        {isEdit&& <>
            <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
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