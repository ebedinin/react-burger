import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from './../../services/type/ingredients.js'
import {addIngredient, addBun} from '../../services/reducers/burger-constructor-reducer.js'
import {actionCreateOrder} from '../../services/actions/order-actions.js'
import style from './burger-constructor.module.css'
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerConstructorIngredientTag } from './burger-constructor-ingredientTag.jsx';
import { BurgerConstructorIngredientDrop } from './burger-constructor-ingredientDrop.jsx';
import {ProtectedAuthRouteElement} from '../protected-auth-route-element/protected-auth-route-element.jsx'
import {getBurgerIngredients,getBurgerBun } from '../../services/reducers/burger-constructor-reducer.js'

import {getUser, getGetUserProcess } from '../../services/reducers/user-reducer.js'

const BurgerConstructor = (props)=>{
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const bun=useSelector(getBurgerBun)
    const burgerIngredients = useSelector(getBurgerIngredients)
    const user = useSelector(getUser)
    
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            if (ingredient.type === "bun"){
                dispatch(addBun(ingredient))
            }
            else{
                dispatch(addIngredient(ingredient))
            }
        },
    });
    const sumOrder = useMemo(()=>{ 
        const sumIngredient = burgerIngredients.reduce((sum,ingredient)=>sum+ingredient.price,0)
        const sumBun = bun?bun.price:0
        return sumIngredient + sumBun*2
    },[bun,burgerIngredients])
    const createOrder = useCallback(()=>{
        if (!bun) return null
        if (!user) {
            navigate("/login")
            return null
        }
       
        let ingredients = burgerIngredients.map(item=>item._id)        
        ingredients.push(bun._id,bun._id)
        dispatch(actionCreateOrder(ingredients))
        
    },[burgerIngredients,bun])
    return (
        <>
        <div className='mb-25'></div>
        <div className='ml-10'>
        <div className={style.burger} ref={dropTarget}>
            <div className='pl-8 mb-4'>
                <ConstructorElement type="top" 
                    isLocked={true}
                    text={bun?bun.name:""}
                    price={bun?bun.price:""}
                    thumbnail={bun?bun.image_large:null}
                />
            </div>
            {
                burgerIngredients.map((item)=>{
                    return (
                        <BurgerConstructorIngredientDrop uid={item.uid} key={item.uid}>
                            <BurgerConstructorIngredientTag ingredient={item} key={item.uid} />
                        </BurgerConstructorIngredientDrop>
                    )
                })
            }
            <div className='pl-8'>
            <ConstructorElement type="bottom"
                isLocked={true}
                text={bun?bun.name:""}
                price={bun?bun.price:""}
                thumbnail={bun?bun.image_large:null}
            />
            </div>

            <div className={`${style.wrapperCreateOrder} mt-10`}>
    <div className={style.createOrder}>
    <span className='text text_type_digits-medium'>{sumOrder}</span>
    <CurrencyIcon className='mr-10' type="primary" />
    <Button htmlType="button" type="primary" size="large" onClick={()=>createOrder()}> 
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