import React from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css'
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from './modal-overlay/modal-overlay';
const Modal = (props) => {
    
    const press_esc = React.useCallback((e)=>{
        if (e.key === "Escape") {
           props.close()
          }          
    }
    )
    React.useEffect(()=>{
        document.addEventListener("keydown", press_esc, false);
        return ()=> document.removeEventListener("keydown", press_esc, false);
    },[])

    return ReactDOM.createPortal(
        <div className={style.root_modal}>
            <ModalOverlay close={props.close}>
                <div className={style.modal}>
                    <div className={style.header}>
                        <div className={style.text}>{props.header_name}</div><CloseIcon className={style.close} type="primary" onClick={props.close} />
                    </div>
                    {props.children}
                </div>
            </ModalOverlay>
        </div>,
        props.modal_root
    )
}

export {Modal}