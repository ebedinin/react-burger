import { TResponse } from "./common"
export type TUser = {
    email:string,
    name: string
}
export type TResponseRefreshToken = TResponse &{
    success:string,
    refreshToken:string,
    accessToken:string
}
export type TResponseUser = TResponse & {
    user: TUser
}
export type TResponseSession = TResponse & {
    message: string
}
export type TResponseLogin = TResponse & {
    accessToken:string,
    refreshToken:string,
    user: TUser
}