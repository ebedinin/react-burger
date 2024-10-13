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
import {getIngredienttDetail,setIngredienttDetail } from './services/reducers/ingredient-detail-reducer.js'
import { useDispatch, useSelector } from 'react-redux';



const modalRoot = document.getElementById("modal");
function App() {
  const dispatch = useDispatch()

  /*const [ingridientDetail, setIngridientDetail] = React.useState({
    data: null
  })
    */
  const [order, setOrder] = React.useState({
    data: null
  })
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
  const bun=buns[0];
  const burgerIngredients = [...main.slice(0,2),...sauces.splice(0,2)]
  
  const showIngredient = (ingridient)=>{
    dispatch(setIngredienttDetail(ingridient))
  }
  const closeIngredientDetail = (e)=>{
    dispatch(setIngredienttDetail(null))
  }
  const createOrder = ()=>{
    setOrder({
  ...order,data:{number: "034536"}
})    
}
const closeOrder = (e)=>{
  setOrder({
...order,data:null
})
}


  return (
    <div className={style.app}>
      <AppHeader />
      {!isError&&!loading&&
      <div className={style.wrapper}>        
        <div className={style.item} >
          <BurgerIngredients showIngridient={showIngredient}  ingredients={ingredients}/>
        </div>
        <div className={style.item}>
          <BurgerConstructor bun={bun} burgerIngredients={burgerIngredients} createOrder={createOrder}/>
        </div>
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
    {order.data && 
      <Modal root={modalRoot} title={''} close={closeOrder}>
          <OrderDetails order={order.data}/>
        </Modal>
    }
    </div>
  );
}

export default App;
