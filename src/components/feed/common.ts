import { TIngredient } from "../../services/api/type/ingredients"
import { TExtFeed, TFeed, TFeeds } from "../../services/api/type/order"

const extensionFeeds = (feeds: TFeeds, ingredients: Array<TIngredient>): Array<TExtFeed> => {
    return feeds?.orders.map((feed) => extensionFeed(feed,ingredients))
}

const extensionFeed = (feed: TFeed, ingredients: Array<TIngredient>): TExtFeed => {
    const feedIngredients = feed.ingredients.filter(ingredient => ingredient != null)
    const extFeed = {
        ...feed, ingredients: feedIngredients.map((ingredient) => {
            return ingredients.find((item) => item._id === ingredient) as TIngredient
        })
    }
    return extFeed
}
export { extensionFeeds, extensionFeed }