import React, { FC, useCallback, useMemo } from 'react';
import {addIngredient, addBun, TBurgerConstructorIngredient} from '../../services/reducers/burger-constructor-reducer'
import {actionCreateOrder} from '../../services/actions/order-actions'
import style from './burger-constructor.module.css'
import { useDrop } from "react-dnd";
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerConstructorIngredientTag } from './burger-constructor-ingredientTag';
import { BurgerConstructorIngredientDrop } from './burger-constructor-ingredientDrop';
import {getBurgerIngredients,getBurgerBun } from '../../services/reducers/burger-constructor-reducer'

import {getUser} from '../../services/reducers/user-reducer'
import { useAppDispatch } from '../../services/store/app-dispath';

const BurgerConstructor:FC = ()=>{
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const bun=useSelector(getBurgerBun)
    const burgerIngredients = useSelector(getBurgerIngredients)
    const user = useSelector(getUser)
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient:TBurgerConstructorIngredient) {
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
                    price={bun?bun.price:0}
                    thumbnail={bun?bun.image_large:""}
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
                price={bun?bun.price:0}
                thumbnail={bun?bun.image_large:""}
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

export {BurgerConstructor};