
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TFeed, TFeeds, TResponseFeed } from './type/order'
const initialStates = {
    orders: Array() as TFeed[],
    total: 0,
    totalToday: 0
}
export const feedApi = createApi(
    {
        reducerPath: 'feedApi',
        baseQuery: fetchBaseQuery({ baseUrl: '/' }),
        keepUnusedDataFor: 5,
        endpoints: (build) => ({
            getOrdersAll: build.query<TFeeds, void>({
                queryFn: () => ({ data: initialStates }),
                async onCacheEntryAdded(
                    arg,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved, ...api },
                ) {

                    try {
                        const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all')
                        await cacheDataLoaded
                        ws.onmessage = (event: MessageEvent) => {
                            const data: TResponseFeed = JSON.parse(event.data)
                            updateCachedData((draft) => {
                                draft.orders = data.orders
                                draft.total = data.total
                                draft.totalToday = data.totalToday
                            })
                        }
                        await cacheEntryRemoved
                        console.log("close")
                        ws.onmessage = null
                        ws.close()
                    } catch (e) {
                        console.log(e)
                    }


                }
            }),
            getOrdersUser: build.query<TFeeds, void>({
                queryFn: () => ({ data: initialStates }),
                async onCacheEntryAdded(
                    arg,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${localStorage.getItem("accessToken")?.replace("Bearer ", "")}`)
                    try {
                        await cacheDataLoaded
                        ws.onmessage = (event: MessageEvent) => {
                            const data: TResponseFeed = JSON.parse(event.data)
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
                    console.log("close")
                    ws.onmessage = null
                    ws.close()
                }
            })
        })

    }
)

export const { useGetOrdersAllQuery, useGetOrdersUserQuery } = feedApi
export const reducerFeed = feedApi.reducer
