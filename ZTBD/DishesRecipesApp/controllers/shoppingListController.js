'use strict';

var mongoose = require('mongoose'),
    ShoppingList = mongoose.model('ShoppingList'),
    Actor = mongoose.model('Actors');

exports.list_all_shopping_lists = async function(req, res) {
        var x = await Actor.distinct("shoppingList");
        res.json(x);
};


exports.list_all_shopping_lists_of_actor = function (req, res) {
    Actor.findOne({
        "_id": req.params.actorId,
    }, function (err, actor) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(actor.shoppingList);
        }
    });
};


exports.add_element_to_a_shopping_List_for_a_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
                actor.shoppingList.push(req.body);
                return actor.save();
            }
        )
        .then((actor) => {
            res.json({message: 'Successfully add to shopping list'});
        })
        .catch(e => res.status(400).send(e));
};


exports.update_a_shopping_lists_of_actor = async function (req, res) {
    const update = {
        shoppingList: req.body
    }
    let result = await Actor.findOneAndUpdate({
        "_id": req.params.actorId,
    }, update, {new: true})
    res.json(result)
};


exports.delete_shopping_list_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            actor.shoppingList = [];
            return actor.save();
        })
        .then((recipe) => {
            res.json({ message: 'Shopping List successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};

exports.delete_element_in_shopping_list_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            var element = actor.shoppingList.find((cat, index) => {
                if (cat.id == req.params.shopingListId)
                    return cat
            });
            var idx = actor.shoppingList.indexOf(element)
            if (idx !== -1) {
                actor.shoppingList.splice(idx, 1);
                return actor.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Element of a shopping List successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};


exports.update_element_in_shopping_list_of_actor = async function (req, res) {
    ShoppingList.findById(req.params.shoppingListId)
        .then((recipe) => {
            var element = recipe.step.find((value, index) => {
                if (value.id == req.params.stepId)
                    return value
            });
            var idx = recipe.step.indexOf(element)
            if (idx !== -1) {
                recipe.step[idx] = req.body;
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({message: 'Step successfully updated'});
        })
        .catch(e => res.status(400).send(e));
};




