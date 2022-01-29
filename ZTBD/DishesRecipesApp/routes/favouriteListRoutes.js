'use strict';
module.exports = function (app) {
    var favouriteList = require('../controllers/favouriteListController');

    app.route('/v1/favouriteList')
        .get(favouriteList.list_all_favourite_lists);

    app.route('/v1/actors/:actorId/favouriteLists')
        .get(favouriteList.read_favourite_list_of_actor)
        .post(favouriteList.add_recipie_to_a_favourite_list_of_actor)
        .delete(favouriteList.clear_a_favourite_list_of_actor);

    app.route('/v1/actors/:actorId/favouriteList/:recipeId')
        .delete(favouriteList.delete_a_favourite_list_of_actor);

};
