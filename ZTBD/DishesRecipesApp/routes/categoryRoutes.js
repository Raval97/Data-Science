'use strict';
module.exports = function (app) {
    var categories = require('../controllers/categoryController');

    app.route('/v1/categories')
        .get(categories.list_all_categories);

    app.route('/v1/recipes/:recipeId/categories')
        .get(categories.list_all_categories_of_recipe)
        .post(categories.create_a_category_of_recipe)
        .put(categories.update_a_categories_of_recipe)

    app.route('/v1/recipes/:recipeId/categories/:categoryId')
        .delete(categories.delete_a_category_of_recipe)
        .put(categories.update_a_category_of_recipe)
        .get(categories.read_a_category_of_recipe);

};
