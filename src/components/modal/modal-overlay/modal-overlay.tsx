import React, { EventHandler, FC,MouseEventHandler,ReactElement,useCallback } from 'react';
import style from './modal-overlay.module.css'

type TModalOverlayProps = {
  children?: ReactElement; 
  close: ()=>void
}

const ModalOverlay:FC <TModalOverlayProps>= ({children, close}) =>{

    const clickModalOverlay = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        e.preventDefault()
        if (e.target instanceof Element &&e.target.className === style.modalOverlay) {
           close()
        }          
    },[]
    )
    
    return (
        <div className={style.modalOverlay} onClick={clickModalOverlay}>
            {children}
        </div>
    )
}

export {ModalOverlay}