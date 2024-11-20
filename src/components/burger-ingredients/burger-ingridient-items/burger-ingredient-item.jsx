import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from '../../../services/type/ingredients.js'
import style from './burger-ingridient-item.module.css'
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {setIngredienttDetail } from '../../../services/reducers/ingredient-detail-reducer.js'
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';

const BurgerIngridientItem = (props)=>{
    const ingredient = props.ingredient;
    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: { ...ingredient },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    const dispatch = useDispatch()
    
    return(
        <>
        <div className={`mr-6 mt-6 ${style.burgerIngredientItem}`} onClick={()=>dispatch(setIngredienttDetail(ingredient))} ref={dragRef} >
            <div className={`ml-4 mb-1 ${style.wrapperImageIngridient}`}>
                {props.count!==0 && <Counter count={props.count} size='small'/>}
                <img src={ingredient.image} />
            </div>
            <span className='text text_type_digits-default' >{ingredient.price} <CurrencyIcon /></span>
            <span className="text text_type_main-default">{ingredient.name}</span>
        </div>
        </>
    )
};

BurgerIngridientItem.propTypes = {
    showIngridient: PropTypes.func,
    ingredient: ingridientType,
    sectionName: PropTypes.string,
    count: PropTypes.number
}

export {BurgerIngridientItem}