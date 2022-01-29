'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LaureatesSchema = new Schema({});

module.exports = {
  LaureatesModel: mongoose.model('Laureates', LaureatesSchema),
  LaureatesSchema: LaureatesSchema,
}
