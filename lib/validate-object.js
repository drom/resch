'use strict';

module.exports = () => data => {
    if (typeof data !== 'object') {
        return [`Invalid type: ${typeof data} (expected object)`];
    }
    return [];
};
