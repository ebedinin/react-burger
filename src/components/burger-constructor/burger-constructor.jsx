import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-constructor.module.css'
import {ingridientType} from './../../utils/data.js'

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = (props)=>{
    
    return (
        <>
        <div className='mb-25'></div>
        <div className='ml-10'>
        <div className={style.burger}>
            <div className='pl-8'>
            <ConstructorElement type="top" 
                isLocked={true}
                text={props.bun.name}
                price={props.bun.price}
                thumbnail={props.bun.image_large}
            />
            </div>
            {
                props.burgerIngredients.map((item)=>{
                    return (
                        <div key={item._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement text={item.name}
                            price={item.price}
                            thumbnail={item.image_large}
                        />
                        </div>
                    )
                })
            }
            <div className='pl-8'>
            <ConstructorElement type="bottom"
                isLocked={true}
                text={props.bun.name}
                price={props.bun.price}
                thumbnail={props.bun.image_large}
            />
            </div>
            <div className={`${style.placeOrder} mt-10`}>
                <div ></div>
                <div className=''>
                    <span>610</span>
                    <CurrencyIcon type="primary" />
                    <Button htmlType="button" type="primary" size="large" onClick={props.createOrder}> 
                        Оформить заказ
                    </Button >
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

BurgerConstructor.propTypes = {
    bun:ingridientType,
    burgerIngredients:PropTypes.arrayOf(ingridientType),
    createOrder: PropTypes.func
}

export {BurgerConstructor};