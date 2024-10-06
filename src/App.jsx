import React, { useEffect } from 'react';
import AppHeader from './components/app-header/app-header'
import {BurgerIngredients} from './components/burger-ingredients/burger-ingredients';
import style from './app.module.css'
import {BurgerConstructor} from './components/burger-constructor/burger-constructor.jsx'
import {IngredientDetails} from './components/ingridient-details/ingridient-details.jsx'
import {OrderDetails} from './components/order-details/order-details.jsx'
import {Modal} from './components/modal/modal.jsx'

const url="https://norma.nomoreparties.space/api/ingredients"
const modal_root = document.getElementById("modal");
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
    .then(data  => setState({...state, loading: false, ingridients:data.data}))
  },[])
  const burger_ingredient_bun = state.ingridients.filter((item)=>item.type==="bun");
  const burger_ingredient_sauce = state.ingridients.filter((item)=>item.type==="sauce");
  const burger_ingredient_main = state.ingridients.filter((item)=>item.type==="main");
  const bun_top=burger_ingredient_bun[0];
  const bun_bottom=burger_ingredient_bun[1];
  const burger_ingredient = [...burger_ingredient_main.slice(0,2),...burger_ingredient_sauce.splice(0,2)]
  
  const show_ingridient = (id)=>{
        setState({
      ...state,ingridientDetail:state.ingridients.filter((item)=>item._id===id)[0]
    })    
  }
  const close_ingridient = (e)=>{
    setState({
    ...state,ingridientDetail:null
  })
  }
  const show_order = ()=>{
    setState({
  ...state,order:{number: "034536"}
})    
}
const close_order = (e)=>{
setState({
...state,order:null
})
}
  return (
    <div className={style.app}>
      <AppHeader />
      {!state.loading&&
      <div className={style.wrapper}>        
        <div className={style.item} >
          <BurgerIngredients show_ingridient={show_ingridient} close_ingridient={close_ingridient} burger_ingredients={state.ingridients}/>
        </div>
        <div className={style.item}>
          <BurgerConstructor bun_top={bun_top} bun_bottom={bun_bottom} burger_ingredient={burger_ingredient} create_order={show_order}/>
        </div>
      </div>
    }
    {state.ingridientDetail && 
      <Modal modal_root={modal_root} header_name={'Детали ингридиента'} close={close_ingridient}>
          <IngredientDetails ingridient={state.ingridientDetail}/>
        </Modal>
    }
    {state.order && 
      <Modal modal_root={modal_root} header_name={''} close={close_order}>
          <OrderDetails order={state.order}/>
        </Modal>
    }
    </div>
  );
}

export default App;
