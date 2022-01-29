'use strict';
module.exports = function (app) {
    var comments = require('../controllers/commentController');

    app.route('/v1/comments')
        .get(comments.list_all_comments)

    app.route('/v1/recipes/:recipeId/comments')
        .get(comments.list_all_comments_of_recipe)
        .post(comments.create_a_comment_of_recipe)
        .put(comments.update_a_comments_of_recipe)

    app.route('/v1/recipes/:recipeId/comments/:commentId')
        .delete(comments.delete_a_comment_of_recipe)
        .put(comments.update_a_comment_of_recipe)
        .get(comments.read_a_comment_of_recipe)

};
