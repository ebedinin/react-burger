import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getUser, getGetUserProcess } from '../../services/reducers/user-reducer.js'
import {actionGetUser } from '../../services/actions/user-actions.js'

const ProtectedAuthRouteElement = ({ element }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector(getUser)
  const isUserLoaded = useSelector(getGetUserProcess)
  console.log(user)
  if (!isUserLoaded && !user) {
      navigate("/login")
  }
 
  useEffect(() => {
    dispatch(actionGetUser);
  }, []);

    if (isUserLoaded) {
      return <></>;
    }

    return element;
}

export {ProtectedAuthRouteElement}