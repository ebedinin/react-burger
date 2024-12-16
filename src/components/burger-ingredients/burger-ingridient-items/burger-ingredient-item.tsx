import React, {FC} from 'react';
import style from './burger-ingridient-item.module.css'
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../../services/api/type/ingredients';

type TBurgerIngridientItemProps = {
    ingredient: TIngredient,
    count: number
}

const BurgerIngridientItem: FC<TBurgerIngridientItemProps> = ((props)=>{
    const location = useLocation();
    const ingredient = props.ingredient;
    const ingredientId = ingredient._id;
    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: { ...ingredient },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    return(
        <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        >
        <div className={`mr-6 mt-6 ${style.burgerIngredientItem}`}  ref={dragRef} >
            <div className={`ml-4 mb-1 ${style.wrapperImageIngridient}`}>
                {props.count!==0 && <Counter count={props.count} size='small'/>}
                <img src={ingredient.image} />
            </div>
            <span className='text text_type_digits-default' >{ingredient.price} <CurrencyIcon type="secondary"/></span>
            <span className="text text_type_main-default">{ingredient.name}</span>
        </div>
        </Link>
    )
});

export {BurgerIngridientItem}