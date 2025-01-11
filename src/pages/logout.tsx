import React, {FC, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import {actionLogoutUser} from '../services/actions/user-actions'
import {getLogoutProcess} from '../services/reducers/user-reducer'

import { useDispatch, useSelector } from '../services/store/store';

const Logout:FC = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        dispatch(actionLogoutUser())
      },[dispatch])
      
    const logoutProcess= useSelector(getLogoutProcess)
    if (!logoutProcess){
        navigate("/login")
    }

    return (
        <></>
    )
}

export {Logout};