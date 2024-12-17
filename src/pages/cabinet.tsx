import React, { FC } from 'react';
import style from './cabinet.module.css'
import { Profile } from './profile';
import { Orders } from './order'
import { NavLink  } from 'react-router-dom';

type TCabinetProps = {
    content:string
}

const Cabinet:FC<TCabinetProps> = (props)=>{
    let content = <Profile />;
    
    switch (props.content){
        case 'profile':
            content = <Profile />;
            break;        
        case 'orders':
            content = <Orders />;
            break        
        default:
            content = <Profile />;
            break
        
    }
     
    return (
        <div className={style.wrapper}>
            <div className={style.item}>
                <div className={style.menu}>
                    <NavLink  to="/profile" 
                    className={({ isActive, isPending }) =>{
                            return `text text_type_main-medium ${isActive ? style.active : 'text_color_inactive'}`
                    }}
                    >
                        Профиль
                    </NavLink >
                </div>
                <div className={style.menu}>
                    <NavLink  to="/profile/orders" 
                    className={({ isActive, isPending }) =>{
                            return `text text_type_main-medium ${isActive ? style.active : 'text_color_inactive'}`
                    }}
                    >
                    История заказов
                    </NavLink >
                </div>
                <div className={style.menu}>
                    <NavLink  to="/logout" 
                    className={({ isActive, isPending }) =>{
                            return `text text_type_main-medium ${isActive ? style.active : 'text_color_inactive'}`
                    }}
                    >
                    Выход
                    </NavLink >
                </div>
            </div>
            <div className={style.item}>
            { content }
            </div>
        </div>
    )
}

export {Cabinet};