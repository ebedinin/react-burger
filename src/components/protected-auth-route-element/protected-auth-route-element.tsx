import { FC, ReactElement, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {getUser, getGetUserProcess } from '../../services/reducers/user-reducer'
import {actionGetUser } from '../../services/actions/user-actions'
import { useAppDispatch } from '../../services/store/app-dispath';

type TProtectedAuthRouteElementProps ={
  element: ReactElement
}


const ProtectedAuthRouteElement:FC<TProtectedAuthRouteElementProps> = ({ element }) => {
  const location = useLocation();
  const user = useSelector(getUser)
  const isUserLoaded = useSelector(getGetUserProcess)  
  const dispatch = useAppDispatch()
 
  useEffect(() => {
    dispatch(actionGetUser);
  }, []);

  if (!isUserLoaded && !user) {
      return <Navigate to="/login" state={{ from: location}} />
  }
    if (isUserLoaded) {
      return <></>;
    }

    return element;
}

export {ProtectedAuthRouteElement}