import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {orderType} from './../../services/type/order.js'
import { CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {actionCreateOrder} from '../../services/actions/order-actions.js'
import {getBurgerIngredients,getBurgerBun } from '../../services/reducers/burger-constructor-reducer.js'
import { getOrder } from '../../services/reducers/order-reducer';
const OrderDetails = (props)=>{        
    const order = useSelector(getOrder)
    const dispatch = useDispatch()
    const bun=useSelector(getBurgerBun)
    const burgerIngredients = useSelector(getBurgerIngredients)
    useEffect(()=>{
        let ingredients = burgerIngredients.map(item=>item._id)        
        ingredients.push(bun._id,bun._id)
        dispatch(actionCreateOrder(ingredients))
      },[])
    
    if (!order) {
        return null
    }
    return (
        <div className='mt-8'>
            <div className='text text_type_digits-large'><span >{order.number}</span></div>
            <div className='mt-8 text text_type_main-medium'><span >идентификатор заказа</span></div>
            <div className='mt-15 mb-15'><CheckMarkIcon type="success"  /></div>
            <div className='mb-2 text text_type_main-small'><span >Ваш заказ начали готовить</span></div>
            <div className='mb-30 text text_type_main-small text_color_inactive'><span >Дождитесь готовности на орбитальной станции</span></div>
        </div>
    )
}

OrderDetails.propTypes = {
    order: orderType
}

export {OrderDetails}