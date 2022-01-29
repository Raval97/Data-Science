'use strict';

var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipes');

exports.list_all_steps = async function(req, res) {
    var x = await Recipe.distinct("steps");
    res.json(x);
};


exports.list_all_steps_of_recipe = function (req, res) {
    Recipe.findOne({
        "_id": req.params.recipeId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(recipe.step);
        }
    });
};


exports.create_a_step_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
                recipe.step.push(req.body);
                return recipe.save();
            }
        )
        .then((recipe) => {
            res.json({message: 'Step successfully created'});
        })
        .catch(e => res.status(400).send(e));
};


exports.update_a_steps_of_recipe = async function (req, res) {
    const update = {
        step: req.body
    }
    let result = await Recipe.findOneAndUpdate({
        "_id": req.params.stepId,
    }, update, {new: true})
    res.json(result)
};


exports.update_a_step_of_recipe = async function (req, res) {
    Recipe.findById(req.params.recipeId)
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


exports.delete_a_step_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.step.find((stp, index) => {
                if (stp.id == req.params.stepId)
                    return stp
            });
            var idx = recipe.step.indexOf(element)
            if (idx !== -1) {
                recipe.step.splice(idx, 1);
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Step successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};


