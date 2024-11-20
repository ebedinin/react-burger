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



const modalRoot = document.getElementById("modal");
function App() {
  const dispatch = useDispatch()

  const order = useSelector(getOrder)
  const loading = useSelector(getLoading)
  const isError = useSelector(getError)
  const ingredients = useSelector(getIngredients)
  const ingredienttDetail = useSelector(getIngredienttDetail)

  useEffect(()=>{
    dispatch(actionLoadIngredients());
  },[])

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


  return (
    <div className={style.app}>
      <AppHeader />
      {!isError&&!loading&&
      <div className={style.wrapper}>      
      <DndProvider backend={HTML5Backend}>
        <div className={style.item} >
          <BurgerIngredients 
            showIngridient={showIngredient} 
            burgerIngredients={burgerAllIngredients} 
            ingredients={ingredients} />
        </div>
        <div className={style.item}>
          <BurgerConstructor bun={bun} burgerIngredients={burgerIngredients} />
        </div>
      </DndProvider>  
      </div>
    }
    {isError&&
    <p className="text text_type_main-large text_color_inactive">Ошибка загрузки ингридиентов</p>
    }
    {ingredienttDetail && 
      <Modal root={modalRoot} title={'Детали ингридиента'} close={closeIngredientDetail}>
          <IngredientDetails ingridient={ingredienttDetail}/>
        </Modal>
    }
    {order && 
      <Modal root={modalRoot} title={''} close={closeOrder}>
          <OrderDetails order={order}/>
        </Modal>
    }
    </div>
  );
}

export default App;
