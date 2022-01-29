'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NobelPrizesSchema = new Schema({});

module.exports = {
  NobelPrizesModel: mongoose.model('Prizes', NobelPrizesSchema),
  NobelPrizesSchema : NobelPrizesSchema
}
