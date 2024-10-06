import React from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css'
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
const Modal = (props) => {
/*

        <div className={style.modal}>
            <div > </div>
                
        </div> 
        )
*/
    const press_esc = React.useCallback((e)=>{
        if (e.key === "Escape") {
           props.close()
          }
          
    }
    )
    const click_modal_overlay = React.useCallback((e)=>{
        if (e.target.className === style.modal_overlay) {
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
            <div className={style.modal_overlay} onClick={click_modal_overlay}>
                <div className={style.modal}>
                    <div className={style.header}>
                        <div className={style.text}>{props.header_name}</div><CloseIcon className={style.close} type="primary" onClick={props.close} />
                    </div>
                    {props.children}
                </div>
            </div>
        </div>,
        props.modal_root
    )
}

export {Modal}