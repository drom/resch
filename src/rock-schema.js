'use strict';

const person = {
    // type: 'object',
    title: 'Person',
    properties: {
        kind: { enum: ['person'] }
    }
};

const group = {
    // type: 'object',
    title: 'Group',
    properties: {
        kind: { enum: ['group'], widget: 'label' },
        members: {
            type: 'array', title: 'Band members',
            items: {
                type: 'object', title: 'Band member',
                properties: {
                    first: {
                        type: 'string', title: 'First name',
                        pattern: '^[a-zA-Z]+$'
                    },
                    last: {
                        type: 'string', title: 'Last name'
                    },
                    tools: {
                        type: 'array', title: 'Tools',
                        items: {
                            type: 'string', title: 'instrument'
                        }
                    },
                    alive: {
                        type: 'boolean', title: 'alive'
                    },
                    gender: {
                        enum: ['M', 'F'], title: 'gender'
                    }
                }
            }
        }
    }
};

module.exports = {
    type: 'object', title: 'Rock',
    properties: {
        years: {
            type: 'object', title: 'Years',
            properties: {
                from: {
                    type: 'integer', title: 'From',
                    minimum: 1900,
                    maximum: 2020,
                    exclusiveMaximum: true
                },
                to: {
                    type: 'number', title: 'To',
                    minimum: 1900,
                    exclusiveMinimum: true,
                    maximum: 2020,
                }
            }
        },
        contry: {
            type: 'null', title: 'Country'
        },
        artist: {
            type: 'array', title: 'Artists',
            items: {
                type: 'object',
                oneOf: [person, group],
                properties: {
                    name: {
                        type: 'string', title: 'Name',
                        minLength: 2, maxLength: 42
                    }
                }
            }
        }
    }
};
