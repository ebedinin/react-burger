import React from 'react';
import PropTypes from 'prop-types';
import style from './app-header.module.css'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
const AppHeader = (props)=>{
    return (
        <header className={`${style.header} pt-4`} >
            <nav > 
                <div className={`${style.headerItem}`} >
                    <div className='ml-5 mr-5'   >
                    <Link to='/'>
                        <BurgerIcon  type="primary"/>
                        <span className='pl-2 text text_type_main-default'>Конструктор</span>
                        </Link>
                    </div>
                </div>
                <div className={`${style.headerItem}`} > 
                    <div className='ml-5 mr-5' >
                    <Link to='/orders'>
                        <ListIcon className='ml-2' type="secondary" />
                        <span className="pl-2 text text_type_main-default text_color_inactive" >Лента заказов</span>
                        </Link>
                    </div>
                </div> 
                <div className={`${style.headerItem} ml-25 mr-25`}><Logo /></div>
                <div className={`${style.headerItem} ml-30`} >
                    <div className='ml-5' >
                        <Link to='/profile'>
                        <ProfileIcon type="secondary" />
                        <span className='pl-2 text text_type_main-default text_color_inactive'>Личный кабинет</span>
                        </Link>
                    </div>
                </div>
            </nav> 
        </header>
    )
};

AppHeader.propTypes = {
    
}

export default AppHeader;
