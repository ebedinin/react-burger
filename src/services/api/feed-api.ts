
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TFeed, TFeeds, TResponseFeed } from './type/order'
import { refreshToken } from './utils/common'
const initialStates = {
    orders: [] as TFeed[],
    total: 0,
    totalToday: 0
}
export const feedApi = createApi(
    {
        reducerPath: 'feedApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'https://norma.nomoreparties.space/api/orders' }),
        keepUnusedDataFor: 5,
        endpoints: (build) => ({            
            getOrder: build.query<TFeeds, string>({
                query: (orderId) => ({ url: `/${orderId}` }),
                keepUnusedDataFor: 1,
            }),
            getOrdersAll: build.query<TFeeds, void>({
                queryFn: () => ({ data: initialStates }),
                async onCacheEntryAdded(
                    arg,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved, ...api },
                ) {                   
                    const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all')
                    try {
                        await cacheDataLoaded
                        ws.onmessage = (event: MessageEvent) => {
                            const data: TResponseFeed = JSON.parse(event.data)
                            if (!data.success) {  
                            }
                            updateCachedData((draft) => {
                                draft.orders = data.orders
                                draft.total = data.total
                                draft.totalToday = data.totalToday
                            })
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    await cacheEntryRemoved
                    ws.onmessage = null
                    ws.close()

                }
            }),
            getOrdersUser: build.query<TFeeds, void>({
                queryFn: () => ({ data: initialStates }),
                async onCacheEntryAdded(
                    arg,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await refreshToken()
                    const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${localStorage.getItem("accessToken")?.replace("Bearer ", "")}`)                                  
                    try {
                        await cacheDataLoaded
                        ws.onmessage = (event: MessageEvent) => {
                            const data: TResponseFeed = JSON.parse(event.data)
                            if (!data.success) {  
                            }
                            updateCachedData((draft) => {
                                draft.orders = data.orders
                                draft.total = data.total
                                draft.totalToday = data.totalToday
                            })
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    await cacheEntryRemoved
                    ws.onmessage = null
                    ws.close()
                }
            })
        })

    }
)

export const { useGetOrdersAllQuery, useGetOrdersUserQuery, useGetOrderQuery } = feedApi
export const reducerFeed = feedApi.reducer
