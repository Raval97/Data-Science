'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var QuantitySchema = new Schema({ // add units 
  quantity: {
    type: Number,
    min: 0,
    required: 'Kindly enter the weight'
  },
  unit: {
    type: String,
    required: 'Kindly enter the unit of ingredient'
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = {
  QuantityModel: mongoose.model('Quantity', QuantitySchema),
  QuantitySchema: QuantitySchema,
}
