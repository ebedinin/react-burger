import { TResponse } from "./common"

export type TOrder = {
    number: number
}
export type TResponseOrder = TResponse & {
    name: string,
    order: TOrder
}
export type TOrderStatus = 'created' | 'pending' | 'done'
export type TFeed = {
    ingredients: Array<string>,
    _id: string,
    name: string,
    number: number,
    createdAt: string,
    updatedAt: string
}
export type TFeeds = {    
    orders : Array<TFeed>,
    total: number,
    totalToday: number
}
export type TResponseFeed = TResponse & TFeeds