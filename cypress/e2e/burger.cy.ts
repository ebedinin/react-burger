import { selectors } from "../support/selectors";

//const burgerConstructorSelector = '[data-cy="constructor"]';
const basket = [
    '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa093d"]',
    '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa093e"]',
    '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0944"]',
    '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0946"]',
    '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0948"]',
    '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa094a"]',
    '[data-cy="dragableIngredients-643d69a5c3f7b9001cfa0945"]',
]
const testUrl = 'http://localhost:3000/'
const arr = ['Калорий', 'Белки', 'Жиры', 'Углеводы'];
describe('service is available', function () {
    before(function () {
        cy.viewport(1920, 1024);        
        cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
        cy.intercept("POST", "api/auth/login", { fixture: "auth.json" });        
        cy.intercept("POST", "api/orders", { fixture: "orders.json" });
    });
    it('should DND and createOrder', () => {
        
        cy.visit(testUrl);
        cy.get(selectors.ingredients.bun).first().trigger('dragstart');
        cy.get(selectors.constructor.burgerConstructor).trigger('drop');

        basket.forEach((item) => {
            cy.get(item).trigger('dragstart');
            cy.get(selectors.constructor.burgerConstructor).trigger('drop');
        })


        cy.get('button').contains('Оформить заказ').click();
        cy.get(selectors.login.loginSubmit).type('testuser@mail.com');
        cy.get(selectors.login.pwdSubmit).type('testuserpassword');
        cy.get(selectors.login.submitLoginForm).click();



        cy.get(selectors.constructor.submitConstructorForm).click();

        cy.get(selectors.constructor.orderNumber).should('exist');;
        cy.contains('идентификатор заказа').should('exist');
        cy.contains('Ваш заказ начали готовить').should('exist');
        cy.contains('Дождитесь готовности на орбитальной станции').should('exist');
        cy.debug()
        cy.get(selectors.modal.modalCloseIcon).click({ force: true });

        cy.get(selectors.modal.modalContainer).should('not.exist');
    });
    it('should ingredient detail', () => {        
        cy.viewport(1920, 1024);
        cy.visit(testUrl);  
        basket.forEach((item) => {
            cy.get(item).first().click();
            cy.get(selectors.modal.modalContainer).should('exist').contains('Детали ингредиента');

            arr.forEach((item) => {
                cy.get(selectors.modal.modalContainer).should('exist').contains(item);
            });

            cy.get(selectors.modal.modalCloseIcon).click({ force: true });
            cy.get(selectors.modal.modalContainer).should('not.exist');
        })
    });

});