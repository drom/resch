'use strict';

const bb = (des, a1, a2) => (
    Object.keys(des).reduce((res, key) => {
        res[key] = des[key](a1)(a2);
        return res;
    }, {})
);

module.exports = React => des => {

    const comps = bb(des, React, genForm);

    function genForm (config) {
        return comps[config.schema.type](config);
    }

    return genForm;
};
