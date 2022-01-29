'use strict';
module.exports = function (app) {
    var dataWarehouse = require('../controllers//dataWarehouseController');


    app.route('/v1/datawarehouse/likedDishedForAgeGroupe')
        .get(dataWarehouse.list_mostly_liked_dishes_by_each_age_groupe);

    app.route('/v1/datawarehouse/mostlyAddedToFavouriteGroupedByDifficulty')
        .get(dataWarehouse.list_mostly_added_to_favourite_by_each_difficulty_level);

    app.route('/v1/datawarehouse/ingredientsMostlyAddedToShoppingsList')
        .get(dataWarehouse.list_mostly_added_to_shopping_list);

    app.route('/v1/datawarehouse/MostCommentedRecipes')
        .get(dataWarehouse.list_most_commented_recipes);

    app.route('/v1/datawarehouse/MostlyLikedThisWeek')
        .get(dataWarehouse.list_most_liked_recipes);

    // most liked this weeks kind of doubled to previous ones
    app.route('/v1/datawarehouse/MostlyLikedThisWeek')
        .get(dataWarehouse.list_most_liked_this_week);

    app.route('/v1/datawarehouse/MostlyCommentedThisWeek')
        .get(dataWarehouse.list_most_commented_this_week);
    
};
