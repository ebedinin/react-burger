import React, { FC, useMemo } from 'react';
import { TExtFeed, TFeed, TFeeds } from '../../services/api/type/order';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useGetOrderQuery, useGetOrdersAllQuery, useGetOrdersUserQuery } from '../../services/api/feed-api';
import { getIngredients } from '../../services/reducers/ingredients-reducer';
import { useSelector } from '../../services/store/store';
import { TIngredient } from '../../services/api/type/ingredients';
import { Link, useLocation, useParams } from 'react-router-dom';
import style from './feed.module.css'
import { SummaryOrders } from './summary-orders';
import { extensionFeed, extensionFeeds } from './common';



type TFeedProps = {
    feed: TExtFeed
}

const Feed: FC<TFeedProps> = ({ feed }) => {
    const greaterMaximum = 6
    const nameMaximum = 35
    const formatDate = <FormattedDate date={new Date(feed.createdAt)} />
    const sumOrder = useMemo(()=>feed.ingredients.reduce((sum,ingredient)=>sum+ingredient.price,0),
    [feed.ingredients])
    const countGreaterMaximum = feed.ingredients.length > greaterMaximum?feed.ingredients.length-greaterMaximum:0
    const ingredients = feed.ingredients.slice(0,greaterMaximum).map((ingredient,index) => 
        <div className={`${style.containerIngredient}`}>
            <img className={`${style.ingredientImage}`}src={ingredient.image} />
            {index===greaterMaximum-1 && countGreaterMaximum &&<div className={style.text}>+{countGreaterMaximum}</div>}
        </div>)
        
    return (
        <div className={`pl-2 pr-3 ${style.containerFeed}`} >
            <div className={`mt-6 ${style.containerSpaceBetween}`}>
                <div className={`text text_type_main-default ${''}`}>#{feed.number}</div>
                <div className={`text text_type_main-default ${''}`}>{formatDate}</div>
            </div>
            <div className={`mt-6 ${style.containerSpaceBetween}`}>
                <span className='text text_type_digits-default' >{feed.name.length > nameMaximum? `${feed.name.slice(0,nameMaximum)}...`:feed.name}</span>
            </div>
            <div className={`mt-6 mb-6 ${style.containerSpaceBetween}`}>
                <div className={`text text_type_main-default ${''}`}>{ingredients}</div>
                <div className={`text text_type_main-default pt-3 ${''}`}>
                    <CurrencyIcon className='' type="primary" />
                    <span className='text text_type_digits-default pl-1'>{sumOrder}</span>
                </div>                
            </div>
        </div>
    )
}

type TOrderProps = {
    order: TExtFeed
}

const Order: FC<TOrderProps> = ({ order }) => {
    const formatDate = <FormattedDate date={new Date(order.createdAt)} />
    const sumOrder = useMemo(()=>order.ingredients.reduce((sum,ingredient)=>sum+ingredient.price,0),
    [order.ingredients])
    const status = order.status === "done"?"Выполнен":order.status === "created"?"Создан":"Выполняется"
    const sumIngredients = order.ingredients.reduce((sumIngredients, currentIngredient)=>{
        if (sumIngredients.has(currentIngredient._id)){
            let ingredient = sumIngredients.get(currentIngredient._id) as TIngredient & {count: number}
            ingredient.count += 1  
        }
        else        
            sumIngredients.set(currentIngredient._id,{...currentIngredient,count: 1})        

        return sumIngredients
    },
    new Map() as Map<string, TIngredient & {count: number}>)    
    
    const ingredients = (<>
        {Array.from(sumIngredients.values()).map((ingredient,index) => 
        <div className={`${style.containerSpaceBetween}`} key={ingredient._id}>
            <div className={`${style.containerStart}`}>
                <div className={`${style.containerIngredient}`}>
                    <img className={`${style.ingredientImage}`} src={ingredient.image} />
                </div>
                <div>
                    <span className={`text text_type_main-small `}>{ingredient.name}</span>
                </div>
            </div>
            <div className={`text text_type_main-default pt-3 ${''}`}>
                <span className='text text_type_digits-default pl-1'>{ingredient.count} x {ingredient.price}</span>
                <CurrencyIcon className='' type="primary" />
            </div>  
        </div>
        )}
    </>)
    return (
        <div className={``} >
            <h3 className={`text text_type_main-small `}>#{order.number}</h3>
            <div className={`mt-10`}>
                <span className={`text text_type_main-small `}>#{order.name}</span>
            </div>
            <div className={`mt-3`}>
                <span className={`text text_type_main-small `}>#{status}</span>
            </div>            
            <div className={`mt-15`}>
            <h3 className={`text text_type_main-large `}>Состав:</h3>
                <span className={`text text_type_main-small `}>#{status}</span>
            </div>            
            <div className={`${style.containerColumn}`}>
                {ingredients}
            </div>
            <div className={`mt-10 ${style.containerSpaceBetween}`}>
                <div>
                    <span className={`text text_type_main-small `}>{formatDate}</span>
                </div>
                <div>
                    <span className={`text text_type_main-small `}>{sumOrder}</span>
                    <CurrencyIcon className='' type="primary" />
                </div>
            </div>
        </div>
    )
}


const OrderAll: FC = () => {
    let {orderNumber}  = useParams();
    if (orderNumber === undefined) orderNumber=""
    const { data, isFetching, isLoading, isError, isSuccess } = useGetOrderQuery(orderNumber)
    const ingredients = useSelector(getIngredients)    
    if (!isSuccess || data === undefined || data.orders.length === 0 || ingredients === undefined) return null   
    const extFeed =  extensionFeed(data.orders[0], ingredients)
    return (        
        <div className={`mt-6 ${style.containerCenter}`}>
            <Order order={extFeed}  />
        </div>
    )    
}


type TFeedsProps = {
    feeds: TFeeds,
    path:string
}

const Feeds: FC<TFeedsProps> = ({feeds, path}) => {    
    const location = useLocation();
    const ingredients = useSelector(getIngredients)
    const extFeeds: Array<TExtFeed> = extensionFeeds(feeds, ingredients)

    return (
        <div className={`${style.containerFeeds}`}>
            
        
            {extFeeds.map(feed=>
            <Link
                key={feed._id}
                to={`${path}/${feed.number}`}
                state={{ background: location }}
            >
                <Feed feed={feed} />
            </Link>)}
        </div>
    )
}
const FeedsAll: FC = () => {
    const { data, isFetching, isLoading, isError, isSuccess } = useGetOrdersAllQuery()
    if (!isSuccess || data === undefined || data.orders === undefined ) return null
    return (
        
        <div className={`mt-6 ${style.containerCenter}`}>
            <Feeds feeds={data} path={'/feed'} />
            <SummaryOrders feeds={data} />
        </div>
    )    
}
const FeedsUser: FC = () => {
    const { data, isFetching, isLoading, isError, isSuccess } = useGetOrdersUserQuery()
    if (!isSuccess || data === undefined || data.orders === undefined ) return null
    return (
        <Feeds feeds={data} path={'/profile/orders'}  />

    )    
}
export { Feed, Feeds, FeedsAll, FeedsUser, OrderAll }