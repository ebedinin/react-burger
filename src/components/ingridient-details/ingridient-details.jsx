import React from 'react';
import {Modal} from './../modal/modal'
import style from './ingridient-details.module.css'

const modalRoot = document.getElementById("modal");

const IngredientDetails = (props) => {
    //const [state, setState] = React.useState({isC})
    console.log(modalRoot)
    return (
        <Modal modal_root={modalRoot} >
            <div className={style.header}>
                <div className={style.text}>Детали ингридиета</div><div className={style.close}>X</div>
            </div>
        </Modal>
    )
}

export {IngredientDetails}