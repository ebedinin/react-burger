import React from 'react';
import style from './modal-overlay.module.css'

const ModalOverlay = (props) =>{

    const click_modal_overlay = React.useCallback((e)=>{
        if (e.target.className === style.modal_overlay) {
           props.close()
          }          
    }
    )
    
    return (
        <div className={style.modal_overlay} onClick={click_modal_overlay}>
            {props.children}
        </div>
    )
}

export {ModalOverlay}