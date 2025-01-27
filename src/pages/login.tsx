import React, { FC, SyntheticEvent, useCallback, useState } from 'react';
import style from './login.module.css'
import { PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { actionLoginUser } from '../services/actions/user-actions'


import { getUser } from '../services/reducers/user-reducer'
import { useDispatch, useSelector } from '../services/store/store';

const Login: FC = () => {
    const [formLogin, setFormLogin] = useState<{ email: string, password: string }>({ email: "", password: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const user = useSelector(getUser)
    if (user) {
        navigate(from)
    }
    const login = (e: SyntheticEvent) => {
        e.preventDefault()
        dispatch(actionLoginUser(formLogin))
    }
    const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setFormLogin({ ...formLogin, email: e.target.value })
        }
        else if (e.target.name === "password") {
            setFormLogin({ ...formLogin, password: e.target.value })
        }
    }, [formLogin])

    return (
        <div className={style.wrapper}>
            <h3>Вход</h3>
            <form onSubmit={login}>
                <EmailInput
                    value={formLogin.email}
                    name={'email'}
                    placeholder={'e-mail'}
                    size={'default'}
                    extraClass="mb-5"
                    onChange={onChangeForm}
                    data-cy="loginSubmit"
                />
                <PasswordInput
                    value={formLogin.password}
                    name={'password'}
                    extraClass="mb-5"
                    icon="ShowIcon"
                    onChange={onChangeForm}
                    data-cy="pwdSubmit"
                />
                <Button htmlType="submit" type="primary" size="small" extraClass="ml-2" data-cy="submitLoginForm">
                    Войти
                </Button>
            </form>
            <h4>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></h4>
            <h4>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></h4>
        </div>
    )
}

export { Login };