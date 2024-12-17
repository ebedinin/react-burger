import React, {FC, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {actionLogoutUser} from '../services/actions/user-actions'
import {getLogoutProcess} from '../services/reducers/user-reducer'

import { useAppDispatch } from '../services/store/app-dispath';

const Logout:FC = ()=>{
    const dispatch = useAppDispatch()
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