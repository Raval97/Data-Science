'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quant = require('./quantityModel');

var IngredientsSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the Ingredients'
  },
  quantities: quant.QuantitySchema,
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  ingredientsModel: mongoose.model('Ingredients', IngredientsSchema),
  IngredientsSchema: IngredientsSchema,
}
