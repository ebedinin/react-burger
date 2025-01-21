import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css'
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from './modal-overlay/modal-overlay';

type TModalProps = {
    close: ()=>void,
    title:string,
    root: HTMLElement,
    children: ReactNode
}

const Modal:FC<TModalProps> = (props) => {
    const {close, title, root,  children} = props
    const pressEsc = React.useCallback((e:KeyboardEvent)=>{
        if (e.key === "Escape") {
           close()
          }          
    }, [close])
    
    React.useEffect(()=>{
        document.addEventListener("keydown", pressEsc, false);
        return ()=> document.removeEventListener("keydown", pressEsc, false);
    },[pressEsc])

    return ReactDOM.createPortal(
        <div className={style.root}>
            <ModalOverlay close={close}>
                <div className={`p-10 ${style.modal}`}>
                    <div className={style.header}>
                        <div className={`text text_type_main-large ${style.text}`}>{title}</div><CloseIcon className={style.close} type="primary" onClick={close} />
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        </div>,
        root
    )
}


export {Modal}