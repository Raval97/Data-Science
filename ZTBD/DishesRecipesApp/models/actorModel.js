'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var createdRecipes = require('./createdRecipesModel');
var favouriteList = require('./favouriteListModel');
var shoppingList = require('./shoppingListModel');
var ActorSchema = new Schema({
  nick: {
    type: String,
    unique: true,
    required: 'Kindly enter the actor surname'
  },
  password: {
    type: String,
    minLength:5,
    required: 'Kindly enter the actor password'
  },
  email: {
    type: String,
    required: 'Kindly enter the actor email',
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']    
  },
  phone: {
    type: String,
    required: 'Kindly enter the phone number'
  },
  age: {
    type: Number,
    required: 'Kindly enter the age number',
    min: 0
  },
  role: [{
    type: String,
    required: 'Kindly enter the user role(s)',
    enum: ['CUSTOMER', 'ADMINISTRATOR'],
    default: 'CUSTOMER'
  }],
  createdRecipes : {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  favouriteLists : {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  shoppingList :{
    type: [shoppingList.ShoppingListSchema],
    default: [],
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

ActorSchema.pre('save', function(callback) {
  var actor = this;
  // Break out if the password hasn't changed
  if (!actor.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(actor.password, salt, function(err, hash) {
      if (err) return callback(err);
      actor.password = hash;
      callback();
    });
  });
});

ActorSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
    console.log('verifying password in actorModel: '+password);
    if (err) return callback(err);
    console.log('iMatch: '+isMatch);
    callback(null, isMatch);
  });
};

ActorSchema.index({ nick: 'text'});
ActorSchema.index({ email: 'text'});

module.exports = {
  ActorModel: mongoose.model('Actors', ActorSchema),
  ActorSchema: ActorSchema,
}
