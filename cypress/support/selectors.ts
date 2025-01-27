export const selectors = {
    login: {
        loginSubmit: '[data-cy="loginSubmit"]',
        pwdSubmit: '[data-cy="pwdSubmit"]',
        submitLoginForm: '[data-cy="submitLoginForm"]',
    },

    header: {
        personalText: '[data-testid=personalText]'
    },

    modal: {
        modalContainer: '[data-cy="modalContainer"]',
        orderNumber: '[data-test=orderNumber]',
        modalCloseIcon: '[data-cy="modalCloseIcon"]'
    },

    ingredients: {
        bun: '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa093c"]'
    },

    constructor: {
        burgerConstructor: '[data-cy="constructor"]',
        submitConstructorForm: '[data-cy="submitConstructorForm"]',
        orderNumber: '[data-cy="orderNumber"]'
    }
};