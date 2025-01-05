import React, {FC, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {actionLogoutUser} from '../services/actions/user-actions'
import {getLogoutProcess} from '../services/reducers/user-reducer'

import { useDispatch } from '../services/store/store';

const Logout:FC = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        dispatch(actionLogoutUser())
      },[])
      
    const logoutProcess= useSelector(getLogoutProcess)
    if (!logoutProcess){
        navigate("/login")
    }

    return (
        <></>
    )
}

export {Logout};