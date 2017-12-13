'use strict';

const str = {
    type: 'object',
    title: 'string',
    properties: {
        title: {
            title: 'title:',
            type: 'string'
        },
        description: {
            title: 'description:',
            type: 'string'
        },
        type: {
            title: 'type:',
            type: 'string',
            enum: ['string']
        },
        minLength: {
            type: 'integer',
            title: 'minLength',
            default: 0
        },
        maxLength: {
            type: 'integer',
            title: 'maxLength'
        },
        pattern: {
            type: 'string',
            title: 'pattern:'
        },
        default: {
            type: 'string',
            title: 'default'
        }
    }
};

const int = {
    type: 'object',
    title: 'integer',
    properties: {
        title: {
            title: 'title:',
            type: 'string'
        },
        description: {
            title: 'description:',
            type: 'string'
        },
        type: {
            title: 'type:',
            type: 'string',
            enum: ['integer']
        },
        minimum: {
            type: 'integer',
            title: 'minimum'
        },
        maximum: {
            type: 'integer',
            title: 'maximum'
        },
        multipleOf: {
            type: 'integer',
            title: 'multipleOf'
        },
        default: {
            type: 'integer',
            title: 'default:'
        }
    }
};

const num = {
    type: 'object',
    title: 'number',
    properties: {
        title: {
            title: 'title:',
            type: 'string'
        },
        description: {
            title: 'description:',
            type: 'string'
        },
        type: {
            title: 'type:',
            type: 'string',
            enum: ['number']
        },
        minimum: {
            type: 'number',
            title: 'minimum'
        },
        maximum: {
            type: 'number',
            title: 'maximum'
        },
        multipleOf: {
            type: 'number',
            title: 'multipleOf'
        },
        default: {
            type: 'number',
            title: 'default'
        }
    }
};

const bool = {
    type: 'object',
    title: 'boolean',
    properties: {
        title: {
            title: 'title:',
            type: 'string'
        },
        description: {
            title: 'description:',
            type: 'string'
        },
        type: {
            title: 'type:',
            type: 'string',
            enum: ['boolean']
        },
        default: {
            type: 'boolean',
            title: 'default',
            enum: [true, false]
        }
    }
};

const obj = {
    type: 'object',
    title: 'object',
    properties: {
        title: {
            title: 'title:',
            type: 'string'
        },
        description: {
            title: 'description:',
            type: 'string'
        },
        type: {
            title: 'type:',
            type: 'string',
            enum: ['object']
        },
        minProperties: {
            title: 'minProperties',
            type: 'integer'
        },
        maxProperties: {
            title: 'maxProperties',
            type: 'integer'
        },
        properties: {
            title: 'properties:',
            type: 'object',
            properties: {},
            additionalProperties: null
        }
    }
};

const arr = {
    type: 'object',
    title: 'array',
    properties: {
        title: {
            title: 'title:',
            type: 'string'
        },
        description: {
            title: 'description:',
            type: 'string'
        },
        type: {
            title: 'type:',
            type: 'string',
            enum: ['array']
        },
        minItems: {
            type: 'integer',
            title: 'minItems'
        },
        maxItems: {
            type: 'integer',
            title: 'maxItems'
        },
        items: {
            oneOf: [
                obj,
                str,
                int,
                num,
                bool
            ]
        }
    }
};

const schema = {
    oneOf: [
        obj,
        str,
        int,
        num,
        bool,
        arr
    ]
};

schema.oneOf[0].properties.properties.additionalProperties = schema;

module.exports = schema;
