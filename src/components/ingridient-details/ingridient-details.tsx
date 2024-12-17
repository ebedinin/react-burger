import React from 'react';
import {getIngredients} from './../../services/reducers/ingredients-reducer'
import style from './ingridient-details.module.css'
import { useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const {ingredientId} = useParams();
    const ingredients = useSelector(getIngredients)
    
    const index = ingredients.findIndex(ingredient => ingredient._id === ingredientId)
    const ingredient = index >= 0?ingredients[index]:null

    return (
        <>
        {ingredient&&
        <div className=''>
            <img src={ingredient.image_large} />
            <span className='text text_type_main-medium mt-4 '>{ingredient.name}</span>
            <div className={`pt-8 ${style.nutritionFacts}`}>
                <div className='text text_type_main-small text_color_inactive mr-5'><span>Калорий, ккал</span><br/><span>{ingredient.calories}</span></div>
                <div className='text text_type_main-small text_color_inactive mr-5'><span>Белки, г</span><br/><span>{ingredient.proteins}</span></div>
                <div className='text text_type_main-small text_color_inactive mr-5'><span>Жиры, г</span><br/><span>{ingredient.fat}</span></div>
                <div className='text text_type_main-small text_color_inactive'><span>Углеводы, г</span><br/><span>{ingredient.carbohydrates}</span></div>
            </div>
        </div>
}
        </>
    )
}

export {IngredientDetails}