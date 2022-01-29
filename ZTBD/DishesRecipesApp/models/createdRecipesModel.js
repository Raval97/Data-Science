'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipe = require('./recipeModel');

var CreatedRecipesSchema = new Schema({
  recipes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = { 
  CreatedRecipesModel: mongoose.model('CreatedRecipes', CreatedRecipesSchema),
  CreatedRecipesSchema: CreatedRecipesSchema
}
