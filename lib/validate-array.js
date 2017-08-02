'use strict';

module.exports = () => data => {
    if (!Array.isArray(data)) {
        return [`Invalid type: ${typeof data} (expected array)`];
    }
    return [];
};
