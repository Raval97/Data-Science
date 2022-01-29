'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavouriteListSchema = new Schema({
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
  FavouriteListModel: mongoose.model('FavouriteList', FavouriteListSchema),
  FavouriteListSchema: FavouriteListSchema
}
