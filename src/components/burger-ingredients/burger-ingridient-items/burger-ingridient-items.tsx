import React, {forwardRef, useCallback } from 'react';
import style from './burger-ingridient-items.module.css'
import {BurgerIngridientItem} from './burger-ingredient-item'
import { TIngredient } from '../../../services/api/type/ingredients';
import { TBurgerConstructorIngredient } from '../../../services/reducers/burger-constructor-reducer';

type TBurgerIngridientItemsProps = {
    burgerIngredients: TBurgerConstructorIngredient[],
    ingredients: TIngredient[],
    sectionName:string
}

const BurgerIngridientItems = forwardRef<HTMLHeadingElement,TBurgerIngridientItemsProps>((props, ref)=>{
    
    const getCountIngredient = useCallback((id:string, ingredients:TBurgerConstructorIngredient[])=>{
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

export {BurgerIngridientItems}