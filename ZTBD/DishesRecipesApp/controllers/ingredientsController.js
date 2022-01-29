'use strict';

var mongoose = require('mongoose'),
    Ingredients = mongoose.model('Ingredients'),
    Actor = mongoose.model('Actors'),
    Recipe = mongoose.model('Recipes'),
    ShoppingList = mongoose.model('ShoppingList');

exports.list_all_ingredients = async function(req, res) {
    var x = await Recipe.distinct("ingredients.name");
    res.json(x);
};



exports.list_all_ingredients_of_recipe = function (req, res) {
    Recipe.find({
        "_id": req.params.recipeId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(recipe.ingredients);
        }
    });
};

exports.create_a_ingredient_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
                recipe.ingredients.push(req.body);
                return recipe.save();
            }
        )
        .then((recipe) => {
            res.json({message: 'Ingredients successfully created'});
        })
        .catch(e => res.status(400).send(e));
};


exports.update_a_ingredients_of_recipe = async function (req, res) {
    const update = {
        ingredients: req.body
    }
    let result = await Recipe.findOneAndUpdate({
        "_id": req.params.recipeId,
    }, update, {new: true})
    res.json(result)
};


exports.update_a_ingredient_of_recipe = async function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.ingredients.find((value, index) => {
                if (value.id == req.params.stepId)
                    return value
            });
            var idx = recipe.ingredients.indexOf(element)
            if (idx !== -1) {
                recipe.ingredients[idx] = req.body;
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({message: 'Ingredient successfully updated'});
        })
        .catch(e => res.status(400).send(e));
};


exports.delete_a_ingredient_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.ingredients.find((value, index) => {
                if (value.id == req.params.ingredientId)
                    return value
            });
            var idx = recipe.ingredients.indexOf(element)
            if (idx !== -1) {
                recipe.ingredients.splice(idx, 1);
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({ message: '(Recipe) Ingredient successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};


exports.list_all_ingredients_of_shopping_list = function (req, res) {
    ShoppingList.find({
        "_id": req.params.shoppingListId,
    }, function (err, shoppingList) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(shoppingList.ingredients);
        }
    });
};


exports.create_a_ingredient_of_shopping_list = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            console.log(req.body)
            actor.shoppingList[0].ingredients.push(req.body);
            return actor.save();
        })
        .then((recipe) => {
            res.json({ message: 'Successfully add ingredient to shopping list' });
        })
        .catch(e => res.status(400).send(e));
};


exports.update_a_ingredients_of_shopping_list = async function (req, res) {
    const update = {
        ingredients: req.body
    }
    let result = await ShoppingList.findOneAndUpdate({
        "_id": req.params.shoppingListId,
    }, update, {new: true})
    res.json(result)
};

exports.update_a_ingredient_of_shopping_list = async function (req, res) {
    ShoppingList.findById(req.params.shoppingListId)
        .then((recipe) => {
            var element = recipe.ingredients.find((value, index) => {
                if (value.id == req.params.stepId)
                    return value
            });
            var idx = recipe.ingredients.indexOf(element)
            if (idx !== -1) {
                recipe.ingredients[idx] = req.body;
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({message: 'Shopping List successfully updated'});
        })
        .catch(e => res.status(400).send(e));
};

exports.delete_a_ingredient_of_shopping_list = function (req, res) {
    ShoppingList.findById(req.params.shoppingListId)
        .then((shoppingList) => {
            var element = shoppingList.ingredients.find((value, index) => {
                if (value.id === req.params.ingredientId)
                    return value
            });
            var idx = shoppingList.ingredients.indexOf(element)
            if (idx !== -1) {
                shoppingList.ingredients.splice(idx, 1);
                return shoppingList.save();
            }
        })
        .then((shoppingList) => {
            res.json({ message: '(Shopping List) Ingredient successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};
