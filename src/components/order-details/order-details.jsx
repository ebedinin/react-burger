import React from 'react';
import { CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
const OrderDetails = (props)=>{

    return (
        <div>
            <span className='text text_type_digits-large'>{props.order.number}</span><br/>
            <span>идентификатор заказа</span><br/>
            <CheckMarkIcon type="secondary"  /><br/>
            <span>Ваш заказ начали готовить</span><br/>
            <span className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}
export {OrderDetails}