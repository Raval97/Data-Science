'use strict';
module.exports = function (app) {
    var ingredients = require('../controllers/ingredientsController');

    app.route('/v1/ingredients')
        .get(ingredients.list_all_ingredients)

    app.route('/v1/recipes/:recipeId/ingredients')
        .get(ingredients.list_all_ingredients_of_recipe)
        .post(ingredients.create_a_ingredient_of_recipe)
        .put(ingredients.update_a_ingredients_of_recipe)

    app.route('/v1/recipes/:recipeId/ingredients/:ingredientId')
        .delete(ingredients.delete_a_ingredient_of_recipe)
        .put(ingredients.update_a_ingredient_of_recipe);

    app.route('/v1/actor/:actorId/shoppingList/:shoppingListId/ingredients')
        .get(ingredients.list_all_ingredients_of_shopping_list)
        .post(ingredients.create_a_ingredient_of_shopping_list)
        .put(ingredients.update_a_ingredients_of_shopping_list)

    app.route('/v1/actor/:actorId/shoppingList/:shoppingListId/ingredients/:ingredientId')
        .delete(ingredients.delete_a_ingredient_of_shopping_list)
        .put(ingredients.update_a_ingredient_of_shopping_list);

};
