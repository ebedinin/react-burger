import React, { FC } from 'react';
import { TBurgerConstructorIngredient} from '../../services/reducers/burger-constructor-reducer'
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import {delIngredient } from '../../services/reducers/burger-constructor-reducer'

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TBurgerConstructorIngredientTagProps = {
    ingredient: TBurgerConstructorIngredient
}

const BurgerConstructorIngredientTag:FC<TBurgerConstructorIngredientTagProps> = (props)=>{
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
                handleClose={()=>dispatch(delIngredient({uid:props.ingredient.uid}))}
            />
        </div>
    )
}
      
export {BurgerConstructorIngredientTag};