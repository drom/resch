'use strict';

module.exports = schema => data => {
    if (!schema.enum.some(e => (e === data))) {
        return [`No enum match for: ${data}`];
    }
    return [];
};
