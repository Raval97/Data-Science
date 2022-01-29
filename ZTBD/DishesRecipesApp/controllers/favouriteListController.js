'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors');

exports.list_all_favourite_lists = async function(req, res) {
    var x = await Actor.distinct("favouriteList");
    res.json(x);
};


exports.read_favourite_list_of_actor = function (req, res) {
    Actor.find({
        "_id": req.params.actorId,
    }, function (err, actor) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(actor.favouriteLists);
        }
    });
};

exports.add_recipie_to_a_favourite_list_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
                actor.favouriteLists.push(req.body.id);
                return actor.save();
            }
        )
        .then((recipe) => {
            res.json({message: 'Successfully add recipe to favourite list'});
        })
        .catch(e => res.status(400).send(e));
};

exports.clear_a_favourite_list_of_actor = async function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            actor.favoriteList = [];
            return actor.save();
        })
        .then((recipe) => {
            res.json({ message: 'Favorite List successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};

exports.delete_a_favourite_list_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            var element = actor.favouriteLists.find((value, index) => {
                if (value.id === req.params.recipeId)
                    return value
            });
            var idx = actor.favouriteLists.indexOf(element)
            if (idx !== -1) {
                actor.favouriteLists.splice(idx, 1);
                return actor.save();
            }
        })
        .then((actor) => {
            res.json({ message: 'Actor Favourite List successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};

