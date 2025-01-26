import { actionCreateOrder } from "../actions/order-actions"
import { clearOrder, initialState, reducerOrder } from "./order-reducer"


describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(reducerOrder(undefined, { type: "" })).toEqual(initialState)
    })
    it(`should handle ${clearOrder.type}`, () => {
        expect(reducerOrder(initialState, { type: `${clearOrder.type}` })).toEqual({
            ...initialState,
            order: null,
            name: ""
        })
    })

    it(`should handle ${actionCreateOrder.typePrefix}/pending`, () => {
        expect(reducerOrder(initialState, { type: `${actionCreateOrder.typePrefix}/pending` })).toEqual({
            ...initialState,
            loading: true
        })
    })

    it(`should handle ${actionCreateOrder.typePrefix}/rejected`, () => {
        expect(reducerOrder(initialState, { type: `${actionCreateOrder.typePrefix}/rejected` })).toEqual({
            ...initialState,
            loading: false,
            isError: true,
            name : "",
            order:  null
        })
    })
    it(`should handle ${actionCreateOrder.typePrefix}/fulfilled`, () => {
        expect(reducerOrder(initialState, {
            type: `${actionCreateOrder.typePrefix}/fulfilled`,
            payload: {                
                    order: {number: 1234567890},
                    name: "Test order name"                
            }
        })).toEqual({
            ...initialState,
            loading: false,
            isError: false,
            name : "Test order name",
            order:  {number: 1234567890}
        })
    })
})