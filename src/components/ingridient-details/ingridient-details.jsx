import React from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from './../../services/type/ingredients.js'
import style from './ingridient-details.module.css'

const modalRoot = document.getElementById("modal");

const IngredientDetails = (props) => {
    return (
        <div className=''>
            <img src={props.ingridient.image_large} />
            <span className='text text_type_main-medium mt-4 '>{props.ingridient.name}</span>
            <div className={`pt-8 ${style.nutritionFacts}`}>
                <div className='text text_type_main-small text_color_inactive mr-5'><span>Калорий, ккал</span><br/><span>{props.ingridient.calories}</span></div>
                <div className='text text_type_main-small text_color_inactive mr-5'><span>Белки, г</span><br/><span>{props.ingridient.proteins}</span></div>
                <div className='text text_type_main-small text_color_inactive mr-5'><span>Жиры, г</span><br/><span>{props.ingridient.fat}</span></div>
                <div className='text text_type_main-small text_color_inactive'><span>Углеводы, г</span><br/><span>{props.ingridient.carbohydrates}</span></div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingridient: ingridientType
}
export {IngredientDetails}