import React from 'react';
import PropTypes from 'prop-types';
import {orderType} from './../../services/type/order.js'
import { CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
const OrderDetails = (props)=>{

    return (
        <div className='mt-8'>
            <div className='text text_type_digits-large'><span >{props.order.number}</span></div>
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