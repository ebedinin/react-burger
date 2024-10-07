import React from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from './../../utils/data.js'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngridientItems} from './burger-ingridient-items/burger-ingridient-items.jsx'
import style from './burger-ingredients.module.css'

const BurgerIngredients = (props) =>{
    const [section, setStateSection] = React.useState("bun");
    const buns = props.ingredients.filter((item)=>item.type==="bun");
    const sauces = props.ingredients.filter((item)=>item.type==="sauce");
    const main = props.ingredients.filter((item)=>item.type==="main");
    const tabs =(
        <>
            <h2 className='mt-10 mb-5'>Собери бургер</h2>
            <div className={`${style.tabs} mb-10`}>
                <Tab value="bun" active={section === "bun"} onClick={setStateSection}>Булки</Tab>
                <Tab value="sauce" active={section === "sauce"} onClick={setStateSection}>Соусы</Tab>
                <Tab value="main" active={section === "main"} onClick={setStateSection}>Начинки</Tab>
            </div>  
            </>
    )
    return (
        <>
            {tabs}
            <div  className={style.burgerIngredients}>
                <BurgerIngridientItems 
                    showIngridient={props.showIngridient} 
                    sectionName="Булки" 
                    ingridients={buns}/>
                <BurgerIngridientItems                     
                    showIngridient={props.showIngridient} 
                    sectionName="Соусы" 
                    ingridients={sauces}/>
                <BurgerIngridientItems                
                    showIngridient={props.showIngridient} 
                    sectionName="Начинки" 
                    ingridients={main}/>
            </div>             
        </>
    )
}
BurgerIngredients.propTypes = {
    showIngridient: PropTypes.func,
    ingredients:PropTypes.arrayOf(ingridientType),
}
export {BurgerIngredients};