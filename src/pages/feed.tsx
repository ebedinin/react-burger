import React, { FC } from 'react';
import { useGetOrdersAllQuery,useGetOrdersUserQuery } from '../services/api/feed-api';

const Feed:FC = ()=>{
    const {data, isFetching,isLoading,isError,isSuccess} = useGetOrdersUserQuery()
    //console.log(data)
    return (
        <h3>
            Количество заказов {data?.total}
            <h4>isFetching={isFetching}</h4>
            <h4>isLoading={isLoading}</h4>
            <h4>isError={isError}</h4>
            <h4>isSuccess={isSuccess}</h4>
            <h4>data={JSON.stringify(data)}</h4>
        </h3>

    )

}
export {Feed}