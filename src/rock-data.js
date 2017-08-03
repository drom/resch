'use strict';

module.exports = {
    years: {
        from: 1961,
        to: 1971
    },
    contry: 'UK',
    artist: [
        {
            kind: 'person',
            name: 'Paul McCartney'
        },
        {
            kind: 'group',
            name: 'The Beatles',
            members: [
                { first: 'John', last: 'Lennon', tools: ['Rhythm guitar'], gender: 'M' },
                { first: 'Paul', last: 'McCartney', tools: ['Bass', 'Piano'], alive: true },
                { first: 'George', last: 'Harrison', tools: ['Lead guitar'], alive: false },
                { first: 'Ringo', last: 'Starr', tools: ['Drums'], alive: true }
            ]
        },
        {
            kind: 'person',
            name: 'John Lennon'
        }
    ]
};
