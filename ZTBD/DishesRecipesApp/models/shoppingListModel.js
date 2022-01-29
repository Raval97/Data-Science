'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredient = require('./ingredientsModel');

var ShoppingListSchema = new Schema({

  ingredients: [ingredient.IngredientsSchema],
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  ShoppingListModel: mongoose.model('ShoppingList', ShoppingListSchema),
  ShoppingListSchema: ShoppingListSchema
}