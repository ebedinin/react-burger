import { FC, ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {getUser, getGetUserProcess } from '../../services/reducers/user-reducer'
import {actionGetUser } from '../../services/actions/user-actions'
import { useDispatch, useSelector } from '../../services/store/store';

type TProtectedAuthRouteElementProps ={
  element: ReactElement
}


const ProtectedAuthRouteElement:FC<TProtectedAuthRouteElementProps> = ({ element }) => {
  const location = useLocation();
  const user = useSelector(getUser)
  const isUserLoaded = useSelector(getGetUserProcess)  
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(actionGetUser);
  }, [dispatch]);

  if (!isUserLoaded && !user) {
      return <Navigate to="/login" state={{ from: location}} />
  }
    if (isUserLoaded) {
      return <></>;
    }

    return element;
}

export {ProtectedAuthRouteElement}