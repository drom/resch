'use strict';

const reGenForm = require('./form');
const reGenArray = require('./array');
const reGenBoolean = require('./boolean');
const reGenEnum = require('./enum');
const reGenNull = require('./null');
const reGenNumber = require('./number');
const reGenObject = require('./object');
const reGenOneOf = require('./one-of');
const reGenString = require('./string');

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
