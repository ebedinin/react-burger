import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './modal.module.css'
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from './modal-overlay/modal-overlay';
const Modal = (props) => {
    
    const pressEsc = React.useCallback((e)=>{
        if (e.key === "Escape") {
           props.close()
          }          
    }
    )
    React.useEffect(()=>{
        document.addEventListener("keydown", pressEsc, false);
        return ()=> document.removeEventListener("keydown", pressEsc, false);
    },[])

    return ReactDOM.createPortal(
        <div className={style.root}>
            <ModalOverlay close={props.close}>
                <div className={`p-10 ${style.modal}`}>
                    <div className={style.header}>
                        <div className={`text text_type_main-large ${style.text}`}>{props.title}</div><CloseIcon className={style.close} type="primary" onClick={props.close} />
                    </div>
                    {props.children}
                </div>
            </ModalOverlay>
        </div>,
        props.root
    )
}

Modal.propTypes = {
    close: PropTypes.func,
    title:PropTypes.string,
    root: PropTypes.node,
    children: PropTypes.node
}

export {Modal}