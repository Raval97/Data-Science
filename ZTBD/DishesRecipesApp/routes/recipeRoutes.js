'use strict';
module.exports = function (app) {
    var recipes = require('../controllers/recipeController');

    app.route('/v1/recipes')
        .get(recipes.list_all_recipes)
        .post(recipes.create_a_recipe);

    app.route('/v1/myrecipes/:actorId')
        .get(recipes.list_my_recipe);

    app.route('/v1/recipes/search')
        .get(recipes.search_recipe);

    app.route('/v1/recipes/:recipeId')
        .get(recipes.read_a_recipe)
        .put(recipes.update_a_recipe)
        .delete(recipes.delete_a_recipe);
};
