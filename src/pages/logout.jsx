import React, {useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {actionLogoutUser} from '../services/actions/user-actions.js'
import {getLogoutProcess} from '../services/reducers/user-reducer.js'


const Logout = ()=>{
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