import React, { FC, ReactElement } from 'react';
import {changeIngredient, TBurgerConstructorIngredient} from '../../services/reducers/burger-constructor-reducer'
import { useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';

type TBurgerConstructorIngredientDropProps = {
    uid:string,    
  children?: ReactElement; 
}

const BurgerConstructorIngredientDrop:FC<TBurgerConstructorIngredientDropProps> = (props)=>{

    const dispatch = useDispatch()
    
    const [, dropTarget] = useDrop({
        accept: "burgerConstructorIngredient",
        drop(ingredient:TBurgerConstructorIngredient) {
            dispatch(changeIngredient({
                ingredientA: ingredient.uid,
                ingredientB: props.uid
            }))
            
        },
    });
    return (
        <div className='mb-4' key={props.uid} ref={dropTarget}>
        { props.children}
        </div>
    )
}

export {BurgerConstructorIngredientDrop};