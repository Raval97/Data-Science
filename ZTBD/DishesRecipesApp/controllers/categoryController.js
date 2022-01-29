'use strict';

var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipes');


exports.list_all_categories = async function (req, res) {
    var x = await Recipe.distinct("category.name");
    res.json(x);
};


exports.list_all_categories_of_recipe = function (req, res) {
    Recipe.findOne({
        "_id": req.params.recipeId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(recipe.category);
        }
    });
};


exports.create_a_category_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
                recipe.category.push(req.body);
                return recipe.save();
            }
        )
        .then((recipe) => {
            res.json({message: 'Category successfully created'});
        })
        .catch(e => res.status(400).send(e));
};

exports.update_a_categories_of_recipe = async function (req, res) {
    const update = {
        category: req.body
    }
    let result = await Recipe.findOneAndUpdate({
        "_id": req.params.recipeId,
    }, update, {new: true})
    res.json(result)
};


exports.update_a_category_of_recipe = async function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.category.find((value, index) => {
                if (value.id == req.params.categoryId)
                    return value
            });
            var idx = recipe.category.indexOf(element)
            if (idx !== -1) {
                recipe.category[idx] = req.body;
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({message: 'Category successfully updated'});
        })
        .catch(e => res.status(400).send(e));
};


exports.delete_a_category_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.category.find((cat, index) => {
                if (cat.id == req.params.categoryId)
                    return cat
            });
            var idx = recipe.category.indexOf(element)
            if (idx !== -1) {
                recipe.category.splice(idx, 1);
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Category successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};


exports.read_a_category_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.category.find((cat, index) => {
                if (cat.id == req.params.categoryId)
                    return cat
            });
            var idx = recipe.category.indexOf(element)
            if (idx !== -1) {
                res.json(recipe.category[idx]);
            }
        })
        .catch(e => res.status(400).send(e));
};
