'use strict';

var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipes'),
    Actor = mongoose.model('Actors');

exports.list_all_recipes = async function(req, res) {
    Recipe.find({}, function(err, recipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(recipe);
        }
    }).limit(200);
};

exports.list_my_recipe = async function(req, res) { // todo
    var actor = await Actor.findById(req.params.actorId)
    var myRecipes = await Recipe.find({
        '_id': {
            $in: [
                actor.createdRecipes
            ]
        }
    })
    res.json(myRecipes);
};

exports.search_recipe = function(req, res) {
    var query = {};

    if(req.query.categoryId){
        query.category=req.query.categoryId;
    }

    if(req.query.calories){
        query.calories = req.query.calories;
    }

    var skip=0;
    if(req.query.startFrom){
        skip = parseInt(req.query.startFrom);
    }

    var limit=0;
    if(req.query.limit){
        limit=parseInt(req.query.limit);
    }

    var sort="";

    if(req.query.reverse=="true"){  
        sort="-";
    }

    if(req.query.sortedBy){  // sort
        sort+=req.query.sortedBy;
    }

    var tempResult = Recipe.find(query);

    if(req.body.ingredients){ // contains specificed ingredients
        tempResult = tempResult.where('ingredients.name').all(req.body.ingredients);
    }

    if(req.body.categories){ // match array of categories
        tempResult = tempResult.where('category.name').all(req.body.categories);
    }

    if(req.query.starsGte){ // stars greater then or equal
        tempResult = tempResult.where('stars').gte(req.query.starsGte);
    }

    if(req.query.starsLte){ // stars lower then or equal
        tempResult = tempResult.where('stars').gte(req.query.starsLte);
    }

    if(req.query.difficultLevelLte){ // difficultLevel lower then or equal
        tempResult = tempResult.where('difficultLevel').lte(req.query.difficultLevelLte);
    }

    if(req.query.difficultLevelGte){ // difficultLevel greater then or equal
        tempResult = tempResult.where('difficultLevel').gte(req.query.difficultLevelGte);
    }

    if(req.query.preparationTimeLte){ // preparationTime greater then or equal
        tempResult = tempResult.where('preparationTime').lte(req.query.preparationTimeLte);
    }

    if(req.query.preparationTimeGte){// preparationTime lower then or equal
        tempResult = tempResult.where('preparationTime').gte(req.query.preparationTimeGte);
    }

    tempResult
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec(function(err, recipe){
        if (err){
            res.send(err);
        }
        else{
            res.json(recipe);
        }
    });
    

};


exports.create_a_recipe = function(req, res) {
    var new_recipe = new Recipe(req.body);
    new_recipe.save(function(err, recipe) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(recipe);
        }
    });
};


exports.read_a_recipe = function(req, res) {
    Recipe.find({_id : req.params.recipeId}, function(err, recipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(recipe);
        }
    });
};


exports.update_a_recipe = async function(req, res) {
    Recipe.updateOne({_id: req.params.recipeId}, req.body, {new: true}, function(err, recipe) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(recipe);
        }
    });
};


exports.delete_a_recipe = function(req, res) {
    Recipe.deleteOne({
        _id: req.params.recipeId
    }, function(err, recipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Recipe successfully deleted' });
        }
    });
};
