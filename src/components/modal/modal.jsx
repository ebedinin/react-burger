import React from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css'

const Modal = (props) => {
/*

        <div className={style.modal}>
            <div > </div>
                
        </div> 
        )
*/
    return ReactDOM.createPortal(
            <>
            {props.children}
            </>,
        props.modal_root
    )
}

export {Modal}