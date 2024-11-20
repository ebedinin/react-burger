import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from './../../../services/type/ingredients.js'
import style from './burger-ingridient-items.module.css'
import {BurgerIngridientItem} from './burger-ingredient-item.jsx'
const BurgerIngridientItems = forwardRef((props, ref)=>{
    const getCountIngredient = useCallback((id, ingredients)=>{
        return ingredients?ingredients.reduce((sum,currentItem)=> currentItem._id === id?sum+1:sum,0):0
    },[props.burgerIngredients])
    return(
        <>
            <h3 ref={ref} > {props.sectionName}</h3>
            <div className={`ml-4 mb-10 ${style.burgerIngridients}`} >                
            {props.ingredients.map((item) =>{
                return(
                    <BurgerIngridientItem ingredient={item} key={item._id} count={getCountIngredient(item._id, props.burgerIngredients)} />
                )
            })
            }
            </div>
        </>
    )
});

BurgerIngridientItems.propTypes = {
    showIngridient: PropTypes.func,
    ingredients:PropTypes.arrayOf(ingridientType),
    burgerIngredients:PropTypes.arrayOf(ingridientType),
    sectionName:PropTypes.string
}

export {BurgerIngridientItems}