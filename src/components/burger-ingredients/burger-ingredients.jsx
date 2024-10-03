
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngridientItems} from './burger-ingridient-items/burger-ingridient-items.jsx'
import {burger_ingredients} from './../../utils/data.js' 
import style from './burger-ingredients.module.css'
import {BurgerConstructor} from './../burger-constructor/burger-constructor.jsx'
const BurgerIngredients = (props) =>{
    const [section, setStateSection] = React.useState("bun");
    const changeSection = (e)=>{
        setStateSection(e.target.value)
    }
    const burger_ingredient_bun = burger_ingredients.filter((item)=>item.type==="bun");
    const burger_ingredient_sauce = burger_ingredients.filter((item)=>item.type==="sauce");
    const burger_ingredient_main = burger_ingredients.filter((item)=>item.type==="main");
    const bun_top=burger_ingredient_bun[0];
    const bun_bottom=burger_ingredient_bun[1];
    const burger_ingredient = [...burger_ingredient_main.slice(0,2),...burger_ingredient_sauce.splice(0,2)]

    const ingidient_tab =(
        <>
            <h2 className='mt-10 mb-5' >Собери бургер</h2>
            <div style={{ display: 'flex'}} className='mb-10 pl-'>
                <Tab value="bun" active={section === "bun"} onClick={setStateSection}>Булки</Tab>
                <Tab value="sauce" active={section === "sauce"} onClick={setStateSection}>Соусы</Tab>
                <Tab value="main" active={section === "main"} onClick={setStateSection}>Начинки</Tab>
            </div>  
            </>
    )
    return (
        <div className={style.wrapper}>
            <div className={style.item} >
                {ingidient_tab}
                <div  className={style.burger_ingredient}>
                    <BurgerIngridientItems ingridient_section_name="Булки" ingridients={burger_ingredient_bun}/>
                    <BurgerIngridientItems ingridient_section_name="Соусы" ingridients={burger_ingredient_sauce}/>
                    <BurgerIngridientItems ingridient_section_name="Начинки" ingridients={burger_ingredient_main}/>
                </div> 
            </div  >
            <div className={style.item}>
                <BurgerConstructor bun_top={bun_top} bun_bottom={bun_bottom} burger_ingredient={burger_ingredient}/>
            </div>
        </div>
    )
}
export {BurgerIngredients};