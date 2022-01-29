'use strict';
module.exports = function (app) {
    var createdRecipes = require('../controllers/createdRecipesController');

    app.route('/v1/createdRecipes')
        .get(createdRecipes.list_all_create_recipes);

    app.route('/v1/actors/:actorId/createdRecipes')
        .get(createdRecipes.list_all_created_recipes_of_actor)
        .post(createdRecipes.add_a_created_recipe_of_actor)
        .delete(createdRecipes.clear_a_created_recipe_of_actor);

    app.route('/v1/actors/:actorId/createdRecipes/:recipeId')
        .delete(createdRecipes.delete_a_created_recipe_of_actor);

};
