'use strict';

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
        bands: {
            type: 'array', title: 'The Bands',
            items: {
                type: 'object', title: 'Band data',
                properties: {
                    name: {
                        type: 'string', title: 'Band name',
                        minLength: 2, maxLength: 42
                    },
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
