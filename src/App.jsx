import React, { useEffect } from 'react';
import AppHeader from './components/app-header/app-header'
import {BurgerIngredients} from './components/burger-ingredients/burger-ingredients';
import style from './app.module.css'
import {BurgerConstructor} from './components/burger-constructor/burger-constructor.jsx'
import {IngredientDetails} from './components/ingridient-details/ingridient-details.jsx'
import {OrderDetails} from './components/order-details/order-details.jsx'
import {Modal} from './components/modal/modal.jsx'

const url="https://norma.nomoreparties.space/api/ingredients"
const modalRoot = document.getElementById("modal");
function App() {
  const [state, setState] = React.useState({ 
    loading: true,
    isError: false,
    ingridientDetail: null,
    ingridients: [],
    order: null
  })
  useEffect(()=>{
    fetch(url)
    .then(response => response.json())
    .then(data  => setState({...state, loading: false,isError:false, ingridients:data.data}))
    .catch(()=> setState({...state,isError:true}))
  },[])
  const buns = state.ingridients.filter((item)=>item.type==="bun");
  const sauces = state.ingridients.filter((item)=>item.type==="sauce");
  const main = state.ingridients.filter((item)=>item.type==="main");
  const bun=buns[0];
  const burgerIngredients = [...main.slice(0,2),...sauces.splice(0,2)]
  
  const showIngridient = (id)=>{
        setState({
      ...state,ingridientDetail:state.ingridients.filter((item)=>item._id===id)[0]
    })    
  }
  const closeIngridientDetail = (e)=>{
    setState({
    ...state,ingridientDetail:null
  })
  }
  const createOrder = ()=>{
    setState({
  ...state,order:{number: "034536"}
})    
}
const closeOrder = (e)=>{
setState({
...state,order:null
})
}


  return (
    <div className={style.app}>
      <AppHeader />
      {!state.isError&&!state.loading&&
      <div className={style.wrapper}>        
        <div className={style.item} >
          <BurgerIngredients showIngridient={showIngridient}  ingredients={state.ingridients}/>
        </div>
        <div className={style.item}>
          <BurgerConstructor bun={bun} burgerIngredients={burgerIngredients} createOrder={createOrder}/>
        </div>
      </div>
    }
    {state.isError&&
    <p className="text text_type_main-large text_color_inactive">Ошибка загрузки ингридиентов</p>
    }
    {state.ingridientDetail && 
      <Modal root={modalRoot} title={'Детали ингридиента'} close={closeIngridientDetail}>
          <IngredientDetails ingridient={state.ingridientDetail}/>
        </Modal>
    }
    {state.order && 
      <Modal root={modalRoot} title={''} close={closeOrder}>
          <OrderDetails order={state.order}/>
        </Modal>
    }
    </div>
  );
}

export default App;
