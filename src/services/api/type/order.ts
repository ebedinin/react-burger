import { TResponse } from "./common"

export type TOrder = {
    number: number
}
export type TResponseOrder = TResponse & {
    name: string,
    order: TOrder
}