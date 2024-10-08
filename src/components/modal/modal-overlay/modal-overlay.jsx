import React from 'react';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css'

const ModalOverlay = (props) =>{

    const clickModalOverlay = React.useCallback((e)=>{
        if (e.target.className === style.modalOverlay) {
           props.close()
          }          
    }
    )
    
    return (
        <div className={style.modalOverlay} onClick={clickModalOverlay}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    close: PropTypes.func,
    children: PropTypes.node
}

export {ModalOverlay}