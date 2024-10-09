import React from 'react';
import PropTypes from 'prop-types';
import style from './app-header.module.css'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
const AppHeader = (props)=>{
    return (
        <header className={`${style.header} pt-4`} >
            <nav > 
                <div className={`${style.headerItem}`} >
                    <div className='ml-5 mr-5'   >
                        <BurgerIcon  type="primary"/>
                        <span className='pl-2 text text_type_main-default'>Конструктор</span>
                    </div>
                </div>
                <div className={`${style.headerItem}`} > 
                    <div className='ml-5 mr-5' >
                        <ListIcon className='ml-2' type="secondary" />
                        <span className="pl-2 text text_type_main-default text_color_inactive" >Лента заказов</span>
                    </div>
                </div> 
                <div className={`${style.headerItem} ml-25 mr-25`}><Logo /></div>
                <div className={`${style.headerItem} ml-30`} >
                    <div className='ml-5' >
                        <ProfileIcon type="secondary" />
                        <span className='pl-2 text text_type_main-default text_color_inactive'>Личный кабинет</span>
                    </div>
                </div>
            </nav> 
        </header>
    )
};

AppHeader.propTypes = {
    
}

export default AppHeader;
