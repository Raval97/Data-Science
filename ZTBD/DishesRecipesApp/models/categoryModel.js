'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the Category'
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  CategoryModel: mongoose.model('Categories', CategorySchema),
  CategorySchema : CategorySchema
}
