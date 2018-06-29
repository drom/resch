'use strict';

const reGenForm = require('./form')
    , reGenArray = require('./array')
    , reGenBoolean = require('./boolean')
    , reGenEnum = require('./enum')
    , reGenNull = require('./null')
    , reGenNumber = require('./number')
    , reGenObject = require('./object')
    , reGenOneOf = require('./one-of')
    , reGenString = require('./string')
    ;

exports.__form = reGenForm;
exports.array = reGenArray;
exports.boolean = reGenBoolean;
exports.enum = reGenEnum;
exports.integer = reGenNumber;
exports.null = reGenNull;
exports.number = reGenNumber;
exports.object = reGenObject;
exports.__oneOf = reGenOneOf;
exports.string = reGenString;
