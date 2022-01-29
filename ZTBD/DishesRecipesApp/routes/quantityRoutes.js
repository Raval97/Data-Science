'use strict';
module.exports = function (app) {
    var quantity = require('../controllers/quantityController');

    app.route('/v1/quantity')
        .get(quantity.list_all_quantity)

    app.route('/v1/recipe/:recipeId/ingredients/:ingredientsId/quantity')
        .get(quantity.list_quantity_of_Ingredient)
        .post(quantity.create_a_quantity_of_ingredient)
        .put(quantity.update_a_quantity_of_ingredient)
        .delete(quantity.delete_a_quantity_of_ingredient);

};
