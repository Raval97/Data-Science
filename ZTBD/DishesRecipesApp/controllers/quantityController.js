'use strict';

var mongoose = require('mongoose'),
    Ingredients = mongoose.model('Ingredients');

exports.list_all_quantity = async function(req, res) {
    var x = await Ingredients.distinct("quantity");
    res.json(x);
};


exports.list_quantity_of_Ingredient = function (req, res) {
    Ingredients.findOne({
        "_id": req.params.ingredientId,
    }, function (err, ingredients) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(ingredients.quantity);
        }
    });
};


exports.create_a_quantity_of_ingredient = function (req, res) {
    Ingredients.findById(req.params.ingredientId)
        .then((ingredients) => {
            ingredients.quantity.push(req.body);
                return ingredients.save();
            }
        )
        .then((ingredients) => {
            res.json({message: 'Ingredients successfully created'});
        })
        .catch(e => res.status(400).send(e));
};


exports.update_a_quantity_of_ingredient = async function (req, res) {
    const update = {
        quantity: req.body
    }
    let result = await Iingredient.findOneAndUpdate({
        "_id": req.params.ingredientId,
    }, update, {new: true})
    res.json(result)
};


exports.delete_a_quantity_of_ingredient = function (req, res) {
    Ingredient.findById(req.params.ingredientId)
        .then((ingredient) => {
            var element = ingredient.quantity.find((cat, index) => {
                if (cat.id == req.params.quantityId)
                    return cat
            });
            var idx = ingredient.quantity.indexOf(element)
            if (idx !== -1) {
                ingredient.quantity.splice(idx, 1);
                return ingredient.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Category successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};
