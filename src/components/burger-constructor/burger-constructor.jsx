import React from 'react';
import style from './burger-constructor.module.css'
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
                text={props.bun_top.name}
                price={props.bun_top.price}
                thumbnail={props.bun_top.image_large}
            />
            </div>
            {
                props.burger_ingredient.map((item)=>{
                    return (
                        <div>
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
                text={props.bun_bottom.name}
                price={props.bun_bottom.price}
                thumbnail={props.bun_bottom.image_large}
            />
            </div>
            <div className={`${style.place_order} mt-10`}>
                <div ></div>
                <div className=''>
                    <span>610</span>
                    <CurrencyIcon type="primary" />
                    <Button htmlType="button" type="primary" size="large"> 
                        Оформить заказ
                    </Button >
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export {BurgerConstructor};