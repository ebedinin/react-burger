import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {getUser, getGetUserProcess } from '../../services/reducers/user-reducer.js'
import {actionGetUser } from '../../services/actions/user-actions.js'

const ProtectedAuthRouteElement = ({ element, urlReturn }) => {
  const dispatch = useDispatch()
  const location = useLocation();
  const from = location.state?.from || '/';
  const user = useSelector(getUser)
  const isUserLoaded = useSelector(getGetUserProcess)
 
  useEffect(() => {
    dispatch(actionGetUser);
  }, []);

  console.log(user)
  if (!isUserLoaded && !user) {
      return <Navigate to="/login" state={{ from: location}} />
  }
    if (isUserLoaded) {
      return <></>;
    }

    return element;
}

export {ProtectedAuthRouteElement}