import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from './../../services/type/ingredients.js'
import {addIngredient, addBun} from '../../services/reducers/burger-constructor-reducer.js'
import {actionCreateOrder} from '../../services/actions/order-actions.js'
import style from './burger-constructor.module.css'
import { useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerConstructorIngredientTag } from './burger-constructor-ingredientTag.jsx';
import { BurgerConstructorIngredientDrop } from './burger-constructor-ingredientDrop.jsx';

const BurgerConstructor = (props)=>{
    const dispatch = useDispatch()
    
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
        const sumIngredient = props.burgerIngredients.reduce((sum,ingredient)=>sum+ingredient.price,0)
        const sumBun = props.bun?props.bun.price:0
        return sumIngredient + sumBun*2
    },[props.bun,props.burgerIngredients])
    //console.log(sumOrder,props.burgerIngredients.reduce((sum,ingredient)=>sum+ingredient.price,0)+props.bun?(props.bun.price*2):0,props.burgerIngredients)
    //console.log(sumOrder)
    const createOrder = useCallback(()=>{
        if (!props.bun) return null
        let ingredients = props.burgerIngredients.map(item=>item._id)        
        ingredients.push(props.bun._id,props.bun._id)
        dispatch(actionCreateOrder(ingredients))
    },[props.burgerIngredients,props.bun])
    return (
        <>
        <div className='mb-25'></div>
        <div className='ml-10'>
        <div className={style.burger} ref={dropTarget}>
            <div className='pl-8 mb-4'>
                <ConstructorElement type="top" 
                    isLocked={true}
                    text={props.bun?props.bun.name:""}
                    price={props.bun?props.bun.price:""}
                    thumbnail={props.bun?props.bun.image_large:null}
                />
            </div>
            {
                props.burgerIngredients.map((item)=>{
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
                text={props.bun?props.bun.name:""}
                price={props.bun?props.bun.price:""}
                thumbnail={props.bun?props.bun.image_large:null}
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