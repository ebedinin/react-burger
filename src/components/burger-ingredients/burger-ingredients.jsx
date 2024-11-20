import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from './../../services/type/ingredients.js'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngridientItems} from './burger-ingridient-items/burger-ingridient-items.jsx'
import style from './burger-ingredients.module.css'

const BurgerIngredients = (props) =>{
    const refSectionBun = useRef()
    const refSectionSouce = useRef()
    const refSectionMain = useRef()
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
    const onScroll=()=>{
        let list = [{section:"bun",top:Math.abs(refSectionBun.current.getBoundingClientRect().top)},
            {section:"sauce",top:Math.abs(refSectionSouce.current.getBoundingClientRect().top)},
            {section:"main",top:Math.abs(refSectionMain.current.getBoundingClientRect().top)}
            ]
        list.sort((a,b)=>a.top-b.top)
        const newSection = list[0].section
        if (newSection !==section){
            setStateSection(list[0].section)
        }
    }
    return (
        <>
            {tabs}
            <div  className={style.burgerIngredients} onScroll={onScroll }>
                <BurgerIngridientItems ref={refSectionBun}
                    showIngredient={props.showIngridient} 
                    burgerIngredients={props.burgerIngredients} 
                    sectionName="Булки" 
                    ingredients={buns}/>
                <BurgerIngridientItems  ref={refSectionSouce}                   
                    showIngridient={props.showIngridient} 
                    burgerIngredients={props.burgerIngredients} 
                    sectionName="Соусы" 
                    ingredients={sauces}/>
                <BurgerIngridientItems ref={refSectionMain}               
                    showIngredient={props.showIngridient} 
                    burgerIngredients={props.burgerIngredients} 
                    sectionName="Начинки" 
                    ingredients={main}/>
            </div>             
        </>
    )
}
BurgerIngredients.propTypes = {
    showIngridient: PropTypes.func,
    ingredients:PropTypes.arrayOf(ingridientType),
}
export {BurgerIngredients};