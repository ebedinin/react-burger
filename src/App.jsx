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
  const [ingridients, setIngridients] = React.useState({ 
    loading: true,
    isError: false,
    data: [],
  })
  const [ingridientDetail, setIngridientDetail] = React.useState({
    data: null
  })
  const [order, setOrder] = React.useState({
    data: null
  })
  useEffect(()=>{
    fetch(url)
    .then(response => {
      if (response.ok){
        return response.json()
      }
      else{
        setIngridients({...ingridients,isError:true})
      }
      })
    .then(data  => {setIngridients({...ingridients, loading: false,isError:false, data:data.data})})
    .catch(()=> setIngridients({...ingridients,isError:true}))
  },[])
  const buns = ingridients.data.filter((item)=>item.type==="bun");
  const sauces = ingridients.data.filter((item)=>item.type==="sauce");
  const main = ingridients.data.filter((item)=>item.type==="main");
  const bun=buns[0];
  const burgerIngredients = [...main.slice(0,2),...sauces.splice(0,2)]
  
  const showIngridient = (id)=>{
    setIngridientDetail({
      ...ingridientDetail,data:ingridients.data.filter((item)=>item._id===id)[0]
    })
  }
  const closeIngridientDetail = (e)=>{
    setIngridientDetail({
    ...ingridientDetail,data:null
  })
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
      {!ingridients.isError&&!ingridients.loading&&
      <div className={style.wrapper}>        
        <div className={style.item} >
          <BurgerIngredients showIngridient={showIngridient}  ingredients={ingridients.data}/>
        </div>
        <div className={style.item}>
          <BurgerConstructor bun={bun} burgerIngredients={burgerIngredients} createOrder={createOrder}/>
        </div>
      </div>
    }
    {ingridients.isError&&
    <p className="text text_type_main-large text_color_inactive">Ошибка загрузки ингридиентов</p>
    }
    {ingridientDetail.data && 
      <Modal root={modalRoot} title={'Детали ингридиента'} close={closeIngridientDetail}>
          <IngredientDetails ingridient={ingridientDetail.data}/>
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
