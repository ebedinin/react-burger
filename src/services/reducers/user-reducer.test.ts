import { actionChangeUser, actionForgotPassword, actionGetUser, actionLoginUser, actionLogoutUser, actionRegistrationUser, actionResetPassword } from "../actions/user-actions"
import { initialState, reducerUser } from "./user-reducer"

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(reducerUser(undefined, { type: "" })).toEqual(initialState)
    })

    it(`should handle ${actionLoginUser.typePrefix}/pending`, () => {
        expect(reducerUser(initialState, { type: `${actionLoginUser.typePrefix}/pending` })).toEqual({
            ...initialState,
            isAuthorizationProcess: true
        })
    })

    it(`should handle ${actionLoginUser.typePrefix}/rejected`, () => {
        expect(reducerUser(initialState, { type: `${actionLoginUser.typePrefix}/rejected` })).toEqual({
            ...initialState,
            isAuthorizationProcess: false,
            isErrorAuthorization: true,
            data: null
        })
    })
    it(`should handle ${actionLoginUser.typePrefix}/fulfilled`, () => {
        expect(reducerUser(initialState, {
            type: `${actionLoginUser.typePrefix}/fulfilled`,
            payload: {
                user: {
                    email: "testuser@testdomain.ru",
                    name: "testusu"
                }
            }
        })).toEqual({
            ...initialState, isAuthorizationProcess: false,
            isErrorAuthorization: false,
            data: {
                email: "testuser@testdomain.ru",
                name: "testusu"
            }
        })
    })

    // actionRegistrationUser
    it(`should handle ${actionRegistrationUser.typePrefix}/pending`, () => {
        expect(reducerUser(initialState, { type: `${actionRegistrationUser.typePrefix}/pending` })).toEqual({
            ...initialState,
            isRegistrationProcess: true
        })
    })

    it(`should handle ${actionRegistrationUser.typePrefix}/rejected`, () => {
        expect(reducerUser(initialState, { type: `${actionRegistrationUser.typePrefix}/rejected` })).toEqual({
            ...initialState,
            isRegistrationProcess: false,
            isErrorRegistration: true,
            data: null
        })
    })
    it(`should handle ${actionRegistrationUser.typePrefix}/fulfilled`, () => {
        expect(reducerUser(initialState, {
            type: `${actionRegistrationUser.typePrefix}/fulfilled`,
            payload: {
                user: {
                    email: "testuser@testdomain.ru",
                    name: "testusu"
                }
            }
        })).toEqual({
            ...initialState, isRegistrationProcess: false,
            isErrorRegistration: false,
            data: {
                email: "testuser@testdomain.ru",
                name: "testusu"
            }
        })
    })

    // actionLogoutUser
    it(`should handle ${actionLogoutUser.typePrefix}/pending`, () => {
        expect(reducerUser(initialState, { type: `${actionLogoutUser.typePrefix}/pending` })).toEqual({
            ...initialState,
            isLogoutProcess: true
        })
    })

    it(`should handle ${actionLogoutUser.typePrefix}/rejected`, () => {
        expect(reducerUser(initialState, { type: `${actionLogoutUser.typePrefix}/rejected` })).toEqual({
            ...initialState,
            isLogoutProcess: false,
            isErrorLogout: true
        })
    })
    it(`should handle ${actionLogoutUser.typePrefix}/fulfilled`, () => {
        expect(reducerUser(initialState, {
            type: `${actionLogoutUser.typePrefix}/fulfilled`,
            payload: {
                user: {
                    email: "testuser@testdomain.ru",
                    name: "testusu"
                }
            }
        })).toEqual({
            ...initialState,
            isLogoutProcess: false,
            data: null
        })
    })


    // actionGetUser
    it(`should handle ${actionGetUser.typePrefix}/pending`, () => {
        expect(reducerUser(initialState, { type: `${actionGetUser.typePrefix}/pending` })).toEqual({
            ...initialState,
            isGetUserProcess: true
        })
    })

    it(`should handle ${actionGetUser.typePrefix}/rejected`, () => {
        expect(reducerUser(initialState, { type: `${actionGetUser.typePrefix}/rejected` })).toEqual({
            ...initialState,
            isGetUserProcess: false,
            isErrorGetUser: true,
            data: null
        })
    })
    it(`should handle ${actionGetUser.typePrefix}/fulfilled`, () => {
        expect(reducerUser(initialState, {
            type: `${actionGetUser.typePrefix}/fulfilled`,
            payload: {
                user: {
                    email: "testuser@testdomain.ru",
                    name: "testusu"
                }
            }
        })).toEqual({
            ...initialState, isGetUserProcess: false,
            isErrorGetUser: false,
            data: {
                email: "testuser@testdomain.ru",
                name: "testusu"
            }
        })
    })


    // actionChangeUser
    it(`should handle ${actionChangeUser.typePrefix}/pending`, () => {
        expect(reducerUser(initialState, { type: `${actionChangeUser.typePrefix}/pending` })).toEqual({
            ...initialState,
            isGetUserProcess: true
        })
    })

    it(`should handle ${actionChangeUser.typePrefix}/rejected`, () => {
        expect(reducerUser(initialState, { type: `${actionChangeUser.typePrefix}/rejected` })).toEqual({
            ...initialState,
            isGetUserProcess: false,
            isErrorGetUser: true,
            data: null
        })
    })
    it(`should handle ${actionChangeUser.typePrefix}/fulfilled`, () => {
        expect(reducerUser(initialState, {
            type: `${actionChangeUser.typePrefix}/fulfilled`,
            payload: {
                user: {
                    email: "testuser@testdomain.ru",
                    name: "testusu"
                }
            }
        })).toEqual({
            ...initialState, isGetUserProcess: false,
            isErrorGetUser: false,
            data: {
                email: "testuser@testdomain.ru",
                name: "testusu"
            }
        })
    })


    // actionForgotPassword
    it(`should handle ${actionForgotPassword.typePrefix}/rejected`, () => {
        expect(reducerUser(initialState, { type: `${actionForgotPassword.typePrefix}/rejected` })).toEqual({
            ...initialState,
            isSendCodeResetPassword: false
        })
    })
    it(`should handle ${actionForgotPassword.typePrefix}/fulfilled message 'Reset email sent'`, () => {
        expect(reducerUser(initialState, {
            type: `${actionForgotPassword.typePrefix}/fulfilled`,
            payload: {
                success: true,
                message: "Reset email sent"
            }
        })).toEqual({ ...initialState, isSendCodeResetPassword: true })
    })

    it(`should handle ${actionForgotPassword.typePrefix}/fulfilled message not 'Reset email sent'`, () => {
        expect(reducerUser(initialState, {
            type: `${actionForgotPassword.typePrefix}/fulfilled`,
            payload: {
                success: true,
                message: "Not reset email sent"
            }
        })).toEqual({ ...initialState, isSendCodeResetPassword: false })
    })
    // actionResetPassword
    it(`should handle ${actionResetPassword.typePrefix}/rejected`, () => {
        expect(reducerUser(initialState, { type: `${actionResetPassword.typePrefix}/rejected` })).toEqual({
            ...initialState,
            isSendCodeResetPassword: false
        })
    })
    it(`should handle ${actionResetPassword.typePrefix}/fulfilled success = true`, () => {
        expect(reducerUser(initialState, {
            type: `${actionResetPassword.typePrefix}/fulfilled`,
            payload: {
                success: true
            }
        })).toEqual({ ...initialState, isSendCodeResetPassword: false })
    })
})

