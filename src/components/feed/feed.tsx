import React, { FC, useMemo } from 'react';
import { TExtFeed, TFeed, TFeeds } from '../../services/api/type/order';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useGetOrdersAllQuery, useGetOrdersUserQuery } from '../../services/api/feed-api';
import { getIngredients } from '../../services/reducers/ingredients-reducer';
import { useSelector } from '../../services/store/store';
import { TIngredient } from '../../services/api/type/ingredients';
import { Link } from 'react-router-dom';
import style from './feed.module.css'
import { SummaryOrders } from './summary-orders';


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
            <img className={`${style.IngredientImage}`}src={ingredient.image} />
            {index===greaterMaximum-1 && countGreaterMaximum &&<div className={style.text}>+{countGreaterMaximum}</div>}
        </div>)
        
    return (
        <Link
        key={feed._id}
        to={`/feed/${feed._id}`}
        >
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
        </Link>
    )
}

type TFeedsProps = {
    feeds: TFeeds ,
    isSuccess: boolean
}

const Feeds: FC<TFeedsProps> = ({feeds}) => {
    const ingredients = useSelector(getIngredients)

    const extFeeds: Array<TExtFeed> = feeds?.orders.map((feed) => {
        const feedIngredients = feed.ingredients.filter(ingredient =>ingredient!=null)
        const extFeed = { ...feed, ingredients: feedIngredients.map((ingredient) => {
            return ingredients.find((item)=>item._id===ingredient) as TIngredient}) }
        return extFeed
    })

    return (
        <div className={`${style.containerFeeds}`}>
            {extFeeds.map(feed=><><Feed feed={feed} /></>)}
        </div>
    )
}
const FeedsAll: FC = () => {
    const { data, isFetching, isLoading, isError, isSuccess } = useGetOrdersAllQuery()
    if (!isSuccess || data === undefined || data.orders === undefined ) return null
    return (
        
        <div className={`mt-6 ${style.containerCenter}`}>
            <Feeds feeds={data} isSuccess={isSuccess}  />
            <SummaryOrders feeds={data} />
        </div>
    )    
}
const FeedsUser: FC = () => {
    const { data, isFetching, isLoading, isError, isSuccess } = useGetOrdersUserQuery()
    if (!isSuccess || data === undefined || data.orders === undefined ) return null
    return (
        <Feeds feeds={data} isSuccess={isSuccess}  />

    )    
}
export { Feed, Feeds, FeedsAll, FeedsUser }