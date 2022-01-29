'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors');

exports.list_all_create_recipes = async function(req, res) {
    var x = await Actor.distinct("createdRecipes");
    res.json(x);
};


exports.list_all_created_recipes_of_actor= function (req, res) {
    Actor.find({
        "_id": req.params.actorId,
    }, function (err, actor) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(actor.createdRecipes);
        }
    });
};


exports.add_a_created_recipe_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
                actor.createdRecipes.push(req.body.id);
                return actor.save();
            }
        )
        .then((actor) => {
            res.json({message: 'Successfully add to created recipes list'});
        })
        .catch(e => res.status(400).send(e));
};


exports.clear_a_created_recipe_of_actor = async function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            actor.createdRecipes = [];
            return actor.save();
        })
        .then((recipe) => {
            res.json({ message: 'Created recipes successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};


exports.delete_a_created_recipe_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            var element = actor.createdRecipes.find((value, index) => {
                if (value.id === req.params.recipeId)
                    return value
            });
            var idx = actor.createdRecipes.indexOf(element)
            if (idx !== -1) {
                actor.createdRecipes.splice(idx, 1);
                return actor.save();
            }
        })
        .then((actor) => {
            res.json({ message: 'Actor Created Recipe successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};

