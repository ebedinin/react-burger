import React from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from '../../services/type/ingredients.js'
import {addIngredient, addBun} from '../../services/reducers/burger-constructor-reducer.js'
import style from './burger-constructor-ingredient.module.css'
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import {delBun, delIngredient } from '../../services/reducers/burger-constructor-reducer.js'

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructorIngredientTag = (props)=>{
    const ingredient = props.ingredient    
    const [{isDrag}, dragRef] = useDrag({
        type: "burgerConstructorIngredient",
        item: { uid:ingredient.uid },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });    
    const dispatch = useDispatch()
    return (
        <div className='mb-4' key={ingredient._id} ref={dragRef}>
            <DragIcon className='mr-2'type="primary" />
            <ConstructorElement text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_large}
                handleClose={(e)=>dispatch(delIngredient({uid:props.ingredient.uid}))}
            />
        </div>
    )
}
        
BurgerConstructorIngredientTag.propTypes = {
    ingredient:ingridientType
}

export {BurgerConstructorIngredientTag};