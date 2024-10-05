import React, { useEffect } from 'react';
import AppHeader from './components/app-header/app-header'
import {BurgerIngredients} from './components/burger-ingredients/burger-ingredients';
import style from './app.module.css'
import {BurgerConstructor} from './components/burger-constructor/burger-constructor.jsx'
import {IngredientDetails} from './components/ingridient-details/ingridient-details.jsx'
import {Modal} from './components/modal/modal.jsx'

const url="https://norma.nomoreparties.space/api/ingredients"
const modal_root = document.getElementById("modal");
function App() {
  const [state, setState] = React.useState({ 
    loading: true,
    isError: false,
    ingridientDetail: null,
    ingridients: []
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
    
    console.log(state.ingridients.filter((item)=>item._id===id)[0])
    setState({
      ...state,ingridientDetail:state.ingridients.filter((item)=>item._id===id)[0]
    })    
  }
  const close_ingridient = ()=>{
    setState({
    ...state,ingridientDetail:null
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
          <BurgerConstructor bun_top={bun_top} bun_bottom={bun_bottom} burger_ingredient={burger_ingredient}/>
        </div>
      </div>
    }
    {state.ingridientDetail && 
        <Modal modal_root={modal_root} >
          <IngredientDetails ingridient={state.ingridientDetail}/>
        </Modal>
    }
    </div>
  );
}

export default App;
