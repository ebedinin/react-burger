import React from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from '../../services/type/ingredients.js'
import {changeIngredient} from '../../services/reducers/burger-constructor-reducer.js'
import style from './burger-constructor-ingredient.module.css'
import { useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';

const BurgerConstructorIngredientDrop = (props)=>{

    const dispatch = useDispatch()
    
    const [, dropTarget] = useDrop({
        accept: "burgerConstructorIngredient",
        drop(ingredient) {
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
        
BurgerConstructorIngredientDrop.propTypes = {
    uid:PropTypes.string
}

export {BurgerConstructorIngredientDrop};