import React, { useEffect } from 'react';
import AppHeader from './components/app-header/app-header'
import {BurgerIngredients} from './components/burger-ingredients/burger-ingredients';
import style from './app.module.css'
import {BurgerConstructor} from './components/burger-constructor/burger-constructor.jsx'
import {IngredientDetails} from './components/ingridient-details/ingridient-details.jsx'
import {OrderDetails} from './components/order-details/order-details.jsx'
import {actionLoadIngredients} from './services/actions/ingredients-actions.js'
import {Modal} from './components/modal/modal.jsx'
import {getLoading, getError, getIngredients } from './services/reducers/ingredients-reducer.js'
import {getBurgerIngredients,getBurgerBun,getBurgerAllIngredients } from './services/reducers/burger-constructor-reducer.js'
import {getIngredienttDetail,setIngredienttDetail } from './services/reducers/ingredient-detail-reducer.js'
import { getOrder, clearOrder } from './services/reducers/order-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {Login} from './pages/login'
import {Logout} from './pages/logout'
import {Register} from './pages/register'
import {ForgotPassword} from './pages/forgot-password'
import {ResetPassword} from './pages/reset-password'
import { Cabinet } from './pages/cabinet';
import {ProtectedAuthRouteElement} from './components/protected-auth-route-element/protected-auth-route-element'
import {actionGetUser } from './services/actions/user-actions.js'

const modalRoot = document.getElementById("modal");
function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const order = useSelector(getOrder)
  const loading = useSelector(getLoading)
  const isError = useSelector(getError)
  const ingredients = useSelector(getIngredients)
  const ingredienttDetail = useSelector(getIngredienttDetail)

  useEffect(()=>{
    dispatch(actionLoadIngredients());
    dispatch(actionGetUser());
  },[])

  const handleModalClose = () => {
    navigate(-1);
  };

  const buns = ingredients.filter((item)=>item.type==="bun");
  const sauces = ingredients.filter((item)=>item.type==="sauce");
  const main = ingredients.filter((item)=>item.type==="main");
  const bun=useSelector(getBurgerBun)
  //const burgerIngredients = [...main.slice(0,2),...sauces.splice(0,2)]
  const burgerIngredients = useSelector(getBurgerIngredients)
  const burgerAllIngredients = useSelector(getBurgerAllIngredients)

  const showIngredient = (ingridient)=>{
    dispatch(setIngredienttDetail(ingridient))
  }
  const closeIngredientDetail = (e)=>{
    dispatch(setIngredienttDetail(null))
  }
 
const closeOrder = (e)=>{
  dispatch(clearOrder())
}
  const burgers = (
    <>
    {!isError&&!loading&&     
      <DndProvider backend={HTML5Backend}>
        <div className={style.item} >
          <BurgerIngredients 
            showIngridient={showIngredient} 
            burgerIngredients={burgerAllIngredients} 
            ingredients={ingredients} />
        </div>
        <div className={style.item}>
          <BurgerConstructor />
        </div>
      </DndProvider>  
    }
    </>
  )
//<ProtectedAuthRouteElement element={} /> <Cabinet content="profile" />
//
  return (
    <div className={style.app}>      
      <AppHeader />
      
      
        <Routes location={background || location}>
          <Route path="/" element={ <div className={style.wrapper}>{burgers}</div>} />
          <Route path='/ingredients/:ingredientId'
               element={<IngredientDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProtectedAuthRouteElement element={<Cabinet content="profile" />} />} />
          <Route path="/orders" element={<ProtectedAuthRouteElement element={<Cabinet content="orders" />} />} />         
          
        </Routes> 
        
    {background  && 
     <Routes>
     <Route
       path='/ingredients/:ingredientId'
       element={
         <Modal root={modalRoot} title={'Детали ингридиента'} close={handleModalClose}>
         <IngredientDetails />
       </Modal>
       }
     />
    </Routes>
    }
    {order &&
    <Modal root={modalRoot} title={''} close={closeOrder}>
    <OrderDetails />
  </Modal>

    }
    {isError&&
    <p className="text text_type_main-large text_color_inactive">Ошибка загрузки ингридиентов</p>
    }
    </div>
  );
}

export default App;
