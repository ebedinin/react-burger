import React from 'react';
import style from './burger-ingridient-items.module.css'
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
const BurgerIngridientItems = (props)=>{
    return(
        < >
            <h3 className={`mt-6`}> {props.ingridient_section_name}</h3>
            <div className={`mb-10 ${style.burger_ingridients}`} >
                
            {props.ingridients.map(item =>{
                return(
                <div className={`${style.burger_ingredient_item} mr-10`} key={item._id} onClick={()=>props.show_ingridient(item._id)} >
                    <div className={style.wrapper_ingridient}>
                        <Counter count={Math.round(Math.random()*10)} size='small'/>
                    <img src={item.image}>
                    </img>
                    </div>
                    <span>20 <CurrencyIcon /></span>
                    <span>{item.name}</span>                    
                </div>
                )
            }

            )
           
                
            }
            </div>
        </>
    )
}
export {BurgerIngridientItems}