import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { getOrder } from '../../services/reducers/order-reducer';

const OrderDetails:FC = ()=>{        
    const order = useSelector(getOrder)
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

export {OrderDetails}