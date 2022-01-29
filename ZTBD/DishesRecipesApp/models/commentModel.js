'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  author:{
    type: String,
    default: ''
  },
  review: {
    type: String,
    required: 'Kindly enter your comments'
  },
  rating: {
    type: Number,
    required: 'Kindly enter the rating',
    min: 0, max: 5
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  CommentModel: mongoose.model('Comments', CommentSchema),
  CommentScheme: CommentSchema
}
