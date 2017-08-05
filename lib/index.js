'use strict';

const reGenForm = require('./form')
    , reGenArray = require('./array')
    , reGenAllOf = require('./all-of')
    , reGenAnyOf = require('./any-of')
    , reGenBoolean = require('./boolean')
    , reGenEnum = require('./enum')
    , reGenInteger = require('./integer')
    , reGenNull = require('./null')
    , reGenNumber = require('./number')
    , reGenObject = require('./object')
    , reGenOneOf = require('./one-of')
    , reGenString = require('./string')
    ;

module.exports = {
    __form: reGenForm,
    array: reGenArray,
    allOf: reGenAllOf,
    anyOf: reGenAnyOf,
    boolean: reGenBoolean,
    enum: reGenEnum,
    enum_label: reGenEnum,
    integer: reGenInteger,
    null: reGenNull,
    number: reGenNumber,
    object: reGenObject,
    __oneOf: reGenOneOf,
    string: reGenString
};
