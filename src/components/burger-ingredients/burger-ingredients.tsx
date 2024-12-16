import React, { FC, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngridientItems} from './burger-ingridient-items/burger-ingridient-items'
import {getBurgerAllIngredients } from './../../services/reducers/burger-constructor-reducer'
import {getIngredients } from './../../services/reducers/ingredients-reducer'
import { useSelector } from 'react-redux';
import style from './burger-ingredients.module.css'
import { TIngredient } from '../../services/api/type/ingredients.js';

const BurgerIngredients:FC = () =>{
    const refSectionBun = useRef<HTMLHeadingElement>(null)
    const refSectionSouce = useRef<HTMLHeadingElement>(null)
    const refSectionMain = useRef<HTMLHeadingElement>(null)
    const [section, setStateSection] = React.useState("bun");
    
    const burgerIngredients = useSelector(getBurgerAllIngredients)
    const ingredients = useSelector(getIngredients)
    const buns:TIngredient[] = ingredients.filter((item)=>item.type==="bun");
    const sauces:TIngredient[]  = ingredients.filter((item)=>item.type==="sauce");
    const main:TIngredient[]  = ingredients.filter((item)=>item.type==="main");
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
        let list = [{section:"bun",top:refSectionBun.current?Math.abs(refSectionBun.current.getBoundingClientRect().top):0},
            {section:"sauce",top:refSectionSouce.current?Math.abs(refSectionSouce.current.getBoundingClientRect().top):0},
            {section:"main",top:refSectionMain.current?Math.abs(refSectionMain.current.getBoundingClientRect().top):0}
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
                    burgerIngredients={burgerIngredients} 
                    sectionName="Булки" 
                    ingredients={buns}/>
                <BurgerIngridientItems  ref={refSectionSouce}  
                    burgerIngredients={burgerIngredients} 
                    sectionName="Соусы" 
                    ingredients={sauces}/>
                <BurgerIngridientItems ref={refSectionMain}    
                    burgerIngredients={burgerIngredients} 
                    sectionName="Начинки" 
                    ingredients={main}/>
            </div>             
        </>
    )
}
export {BurgerIngredients};