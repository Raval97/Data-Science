'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const customAlphabet = require("nanoid").customAlphabet;
const skuGenerator = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6)

var category = require('./categoryModel');
var comment = require('./commentModel');
var steps = require('./stepModel');
var ingredient = require('./ingredientsModel') 

var RecipeSchema = new Schema({
  sku: {
    type: String,
    unique: true,
    //NOTICE that This validation is not executed after the middleware pre-save
    validate: {
      validator: function(v) {
          return /^\w{6}$/.test(v);
      },
      message: 'sku is not valid!, Pattern("^\w{6}$")'
    }
  },
  name: {
    type: String,
    required: 'Kindly enter the item name'
  },
  description: {
    type: String,
    required: 'Kindly enter the description'
  },
  picture: {
    data: Buffer,
    contentType: String,
  },
  preparationTime: {
    type: Number,
    required: 'Kindly enter the preparation time in minutes'
  },
  stars: {
    type: Number,
    min: 0, max: 5
  },
  difficultLevel: {
    type: Number,
    min: 0, max: 5
  },
  protein: {
    type: Number,
    min: 0,
  },
  fat: {
    type: Number,
    min: 0,
  },
  sodium: {
    type: Number,
    min: 0,
  },
  calories: {
    type: Number,
    min: 0,
  },
  linkVideo: {
    type: String,
    default: null,
  },
  createdBy: [Schema.Types.ObjectId],
  category: [category.CategorySchema],
  comments: [comment.CommentScheme],
  steps: [steps.StepSchema],
  ingredients: [ingredient.IngredientsSchema],

  created: {
    type: Date,
    default: Date.now
  }
},  { strict: false });

// Execute before each item.save() call
RecipeSchema.pre('save', function(callback) { 
  var new_item = this;
  new_item.sku = skuGenerator();
  callback();
});

RecipeSchema.index({'category.name':'text'});
RecipeSchema.index({stars:1}); //1 ascending,  -1 descending
RecipeSchema.index({difficultLevel:1}); //1 ascending,  -1 descending
RecipeSchema.index({sku:'text'}); //1 ascending,  -1 descending
RecipeSchema.index({name:'text'});// set weights of each prop
RecipeSchema.index({'ingredients.name' : 'text'}); // set weights of each prop


module.exports = {
  RecipeModel: mongoose.model('Recipes', RecipeSchema),
  RecipeSchema: RecipeSchema
}
