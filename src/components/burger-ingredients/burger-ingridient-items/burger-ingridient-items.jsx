import React from 'react';
import PropTypes from 'prop-types';
import {ingridientType} from './../../../utils/data.js'
import style from './burger-ingridient-items.module.css'
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
const BurgerIngridientItems = (props)=>{
    return(
        <>
            <h3 > {props.sectionName}</h3>
            <div className={`ml-4 mb-10 ${style.burgerIngridients}`} >
                
            {props.ingridients.map(item =>{
                return(
                <div className={`mr-6 mt-6 ${style.burgerIngredientItem}`} key={item._id} onClick={()=>props.showIngridient(item._id)} >
                    <div className={`ml-4 mb-1 ${style.wrapperImageIngridient}`}>
                        <Counter count='1' size='small'/>
                        <img src={item.image} />
                    </div>
                    <span className='text text_type_digits-default' >20 <CurrencyIcon /></span>
                    <span className="text text_type_main-default">{item.name}</span>                    
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