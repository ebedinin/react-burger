import { addBun, addIngredient, changeIngredient, delBun, delIngredient, initialState, reducerBurgerConstructor } from "./burger-constructor-reducer"

describe('burger-constructor reducer', () => {
    it('should return the initial state', () => {
        expect(reducerBurgerConstructor(undefined, { type: "" })).toEqual(initialState)
    })


    const ingredientsBurgerConstructor = [{
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
        uid: 'e4335c11-2b17-4382-a29e-f6f045770356'
    },
    {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
        uid: '00f9965b-f17f-4849-aded-00bab99c3e42'
    },
    {
        _id: '643d69a5c3f7b9001cfa0948',
        name: 'Кристаллы марсианских альфа-сахаридов',
        type: 'main',
        proteins: 234,
        fat: 432,
        carbohydrates: 111,
        calories: 189,
        price: 762,
        image: 'https://code.s3.yandex.net/react/code/core.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
        __v: 0,
        uid: 'e9d93391-116a-4037-b18b-8fe078e28915'
    }
    ]
    it(`should handle ${addIngredient.type}`, () => {
        expect(reducerBurgerConstructor(initialState, {
            type: `${addIngredient.type}`,
            payload: ingredientsBurgerConstructor[0]})).toEqual({
            ...initialState,
            data: ingredientsBurgerConstructor.slice(0,1)
        })
        
        expect(reducerBurgerConstructor({...initialState, data:ingredientsBurgerConstructor.slice(0,1)}, {
            type: `${addIngredient.type}`,
            payload: ingredientsBurgerConstructor[1]})).toEqual({
            ...initialState,
            data: ingredientsBurgerConstructor.slice(0,2)
        })

        expect(reducerBurgerConstructor({...initialState, data:ingredientsBurgerConstructor.slice(0,2)}, {
            type: `${addIngredient.type}`,
            payload: ingredientsBurgerConstructor[2]})).toEqual({
            ...initialState,
            data: ingredientsBurgerConstructor.slice(0,3)
        })
    })

    it(`should handle ${delIngredient.type}`, () => {
        expect(reducerBurgerConstructor({...initialState, data:ingredientsBurgerConstructor}, {
            type: `${delIngredient.type}`,
            payload: {uid: ingredientsBurgerConstructor[0].uid}})).toEqual({
            ...initialState,
            data: ingredientsBurgerConstructor.slice(1)
        })
    })
    
    it(`should handle ${changeIngredient.type}`, () => {
        expect(reducerBurgerConstructor({...initialState, data:ingredientsBurgerConstructor}, {
            type: `${changeIngredient.type}`,
            payload: {ingredientA: ingredientsBurgerConstructor[0].uid, 
                ingredientB: ingredientsBurgerConstructor[2].uid
            }})).toEqual({
            ...initialState,
            data: [ingredientsBurgerConstructor[2],ingredientsBurgerConstructor[1],ingredientsBurgerConstructor[0]]
        })
    })
    const ingredientBun = {
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
    it(`should handle ${addBun.type}`, () => {
        expect(reducerBurgerConstructor(initialState, {
            type: `${addBun.type}`,
            payload: ingredientBun})).toEqual({
            ...initialState,
            bun: ingredientBun
        })
    })
    
    it(`should handle ${delBun.type}`, () => {
        expect(reducerBurgerConstructor({...initialState, bun: ingredientBun}, {
            type: `${delBun.type}`,
            payload: ingredientBun})).toEqual({
            ...initialState,
            bun: null
        })
    })
})