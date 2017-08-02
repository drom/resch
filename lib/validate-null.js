'use strict';

module.exports = () => data => {
    if (data !== null) {
        return [`Invalid type: ${typeof data} (expected null)`];
    }
    return [];
};
