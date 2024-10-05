
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngridientItems} from './burger-ingridient-items/burger-ingridient-items.jsx'
import {IngredientDetails} from './../ingridient-details/ingridient-details.jsx'
// import {burger_ingredients} from './../../utils/data.js' 
import style from './burger-ingredients.module.css'

const BurgerIngredients = (props) =>{
    const [section, setStateSection] = React.useState("bun");
    const changeSection = (e)=>{
        setStateSection(e.target.value)
    }
    const burger_ingredient_bun =props.burger_ingredients.filter((item)=>item.type==="bun");
    const burger_ingredient_sauce = props.burger_ingredients.filter((item)=>item.type==="sauce");
    const burger_ingredient_main = props.burger_ingredients.filter((item)=>item.type==="main");
    const ingidient_tab =(
        <>
            <h2 className='mt-10 mb-5' >Собери бургер</h2>
            <div className={`${style.tab} mb-10`}>
                <Tab value="bun" active={section === "bun"} onClick={setStateSection}>Булки</Tab>
                <Tab value="sauce" active={section === "sauce"} onClick={setStateSection}>Соусы</Tab>
                <Tab value="main" active={section === "main"} onClick={setStateSection}>Начинки</Tab>
            </div>  
            </>
    )
    return (
        <>
            {ingidient_tab}
            <div  className={style.burger_ingredient}>
                <BurgerIngridientItems 
                    show_ingridient={props.show_ingridient} 
                    close_ingridient={props.close_ingridient}
                    ingridient_section_name="Булки" 
                    ingridients={burger_ingredient_bun}/>
                <BurgerIngridientItems                     
                    show_ingridient={props.show_ingridient} 
                    close_ingridient={props.close_ingridient}
                    ingridient_section_name="Соусы" 
                    ingridients={burger_ingredient_sauce}/>
                <BurgerIngridientItems                
                    show_ingridient={props.show_ingridient} 
                    close_ingridient={props.close_ingridient}
                    ingridient_section_name="Начинки" 
                    ingridients={burger_ingredient_main}/>
            </div> 
            
        </>
    )
}
export {BurgerIngredients};