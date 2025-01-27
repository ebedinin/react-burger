import { actionLoadIngredients } from "../actions/ingredients-actions"
import { TIngredient } from "../api/type/ingredients"
import { initialState, reducerIngredient } from "./ingredients-reducer"

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(reducerIngredient(undefined, { type: "" })).toEqual(initialState)
    })

    it(`should handle ${actionLoadIngredients.typePrefix}/pending`, () => {
        expect(reducerIngredient(initialState, { type: `${actionLoadIngredients.typePrefix}/pending` })).toEqual({
            ...initialState,
            loading: true
        })
    })

    it(`should handle ${actionLoadIngredients.typePrefix}/rejected`, () => {
        expect(reducerIngredient(initialState, { type: `${actionLoadIngredients.typePrefix}/rejected` })).toEqual({
            ...initialState,
            loading: false,
            isError: true,
            data: []
        })
    })
    const ingredientsData: TIngredient[] = [
        {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
        },
        {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
        },
        {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
        }]
    it(`should handle ${actionLoadIngredients.typePrefix}/fulfilled`, () => {
        expect(reducerIngredient(initialState, {
            type: `${actionLoadIngredients.typePrefix}/fulfilled`,
            payload: { 
                data: ingredientsData 
            }
        })).toEqual({
            ...initialState,
            loading: false,
            isError: false,
            data: ingredientsData
        })
    })
})