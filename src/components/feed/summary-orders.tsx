import React, { FC, useMemo } from 'react';
import style from './summary-orders.module.css'
import { TFeeds } from '../../services/api/type/order';

type TFeedsProps = {
    feeds: TFeeds
}
const SummaryOrders: FC<TFeedsProps> = ({ feeds }) => {
    const ordersMaximum = 10
    const sortedFeeds = useMemo(() => feeds.orders.reduce((data, feed) => {
        if (feed.status === "done"){
            //const index = data.ordersDone.length - 1
            if (data.ordersDone[data.ordersDone.length - 1].length === ordersMaximum) 
                data.ordersDone.push([])
            data.ordersDone[data.ordersDone.length - 1].push(feed.number)
        }
        else{
            if (data.ordersPending[data.ordersPending.length - 1].length === ordersMaximum) 
                data.ordersPending.push([])
            data.ordersPending[data.ordersPending.length - 1].push(feed.number)
        }
        return data
    },
        { ordersDone: [[]] as Array<Array<number>>, ordersPending: [[]] as Array<Array<number>> }),
        [feeds])
    const ordersDone = sortedFeeds.ordersDone.map((sectionFeed) => 
        <div className={`ml-2`}>
            {sectionFeed.map(feedNumber=><>
                <span className={`text_type_digits-default `}>
                    {feedNumber}
                </span>
                <br></br></>)}
        </div>
    )
    const ordersPending = sortedFeeds.ordersPending.map((sectionFeed) => 
        <div className={`ml-2`}>
            {sectionFeed.map(feedNumber=><>
                <span className={`text_type_digits-default `}>
                    {feedNumber}
                </span>
                <br></br></>)}
        </div>
    )
    return (
        <div className={`ml-5`}>
            <div className={`${style.containerCenter}`}>
            <div>
                <h3><span>Готовы:</span></h3>
                <div className={` ${style.containerCenter}`}>
                    {ordersDone}
                </div>
            </div>
            <div className={`ml-3`}>
                <h3><span>В работе:</span></h3>                
                <div className={` ${style.containerCenter}`}>
                    {ordersPending}
                </div>
            </div>
            </div>

            <div className={`mt-15`}>
                <h3 className={`text text_type_main-default`}>Выполнено за всё время:</h3>
                <span className={`text text_type_main-large`}>{feeds.total}</span>
            </div>
            <div className={`mt-15`}>
                <h3 className={`text text_type_main-default`}>Выполнено за сегодня:</h3>
                <span className={`text text_type_main-large`}>{feeds.totalToday}</span>
            </div>
        </div>
    )
}

export { SummaryOrders }