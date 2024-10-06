import React from 'react';
import style from './ingridient-details.module.css'

const modalRoot = document.getElementById("modal");

const IngredientDetails = (props) => {
    //const [state, setState] = React.useState({isC})
    return (
        <div>
            <img src={props.ingridient.image_large} />
            <span>{props.ingridient.name}</span><br/>
            <div className={style.nutrition_facts}>
                <div><span>Калорий, ккал</span><br/><span>{props.ingridient.calories}</span></div>
                <div><span>Белки, г</span><br/><span>{props.ingridient.proteins}</span></div>
                <div><span>Жиры, г</span><br/><span>{props.ingridient.fat}</span></div>
                <div><span>Углеводы, г</span><br/><span>{props.ingridient.carbohydrates}</span></div>
            </div>
        </div>
    )
}

export {IngredientDetails}