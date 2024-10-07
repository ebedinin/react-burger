import React from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from './../../../utils/data.js'
import style from './burger-ingridient-items.module.css'
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
const BurgerIngridientItems = (props)=>{
    return(
        <>
            <h3 className={`mt-6`}> {props.sectionName}</h3>
            <div className={`mb-10 ${style.burgerIngridients}`} >
                
            {props.ingridients.map(item =>{
                return(
                <div className={`${style.burgerIngredientItem} mr-10`} key={item._id} onClick={()=>props.showIngridient(item._id)} >
                    <div className={style.wrapperIngridient}>
                        <Counter count={Math.round(Math.random()*10)} size='small'/>
                    <img src={item.image}>
                    </img>
                    </div>
                    <span>20 <CurrencyIcon /></span>
                    <span>{item.name}</span>                    
                </div>
                )
            })
            }
            </div>
        </>
    )
}

BurgerIngridientItems.propTypes = {
    showIngridient: PropTypes.func,
    ingridients:PropTypes.arrayOf(ingridientType),
    sectionName:PropTypes.string
}

export {BurgerIngridientItems}