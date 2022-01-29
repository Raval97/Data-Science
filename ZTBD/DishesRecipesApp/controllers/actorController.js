'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors');

exports.list_all_actors = async function(req, res) {
    Actor.find({}, function(err, actor) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    }).limit(200);
};

exports.create_an_actor = function(req, res) {
    var new_actor = new Actor(req.body);
    new_actor.save(function(err, actor) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(actor);
        }
    });
};


exports.read_an_actor = function(req, res) {
    Actor.find({_id : req.params.actorId}, function(err, actor) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    });
};


exports.update_an_actor = async function(req, res) {
    Actor.updateOne({_id: req.params.actorId}, req.body, {new: true}, function(err, actor) {
        if (err){
            if(err.name === 'ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(actor);
        }
    });
};


exports.delete_an_actor = function(req, res) {
    Actor.deleteOne({
        _id: req.params.actorId
    }, function(err, actor) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Actor successfully deleted' });
        }
    });
};
