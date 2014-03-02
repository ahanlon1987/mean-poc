'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        default: '',
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        trim: true
    },
    streetOne: {
        type: String,
        default: '',
        trim: true
    },
    streetTwo: {
        type: String,
        default: '',
        trim: true
    },
    zip:{
        type: Number,
        default:'',
        trim:true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ArticleSchema.path('firstName').validate(function(firstName) {
    return firstName.length;
}, 'First name cannot be blank');

//TODO other field level validations for ArticleCreation

/**
 * Statics
 */
ArticleSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);
