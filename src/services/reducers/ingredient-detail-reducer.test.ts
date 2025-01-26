import { initialState, reducerIngredientDetail, setIngredienttDetail } from "./ingredient-detail-reducer"

describe('ingredient-detail reducer', () => {
    it('should return the initial state', () => {
        expect(reducerIngredientDetail(undefined, { type: "" })).toEqual(initialState)
    })

    const ingredientData = {
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
    }
    it(`should handle ${setIngredienttDetail.type}`, () => {
        expect(reducerIngredientDetail(initialState, {
            type: `${setIngredienttDetail.type}`,
            payload: ingredientData
        })).toEqual({
            ...initialState,
            ingredientDetail: ingredientData
        })
    })
})