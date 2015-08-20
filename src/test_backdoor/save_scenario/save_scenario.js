'use strict';

const schemas = require('../../schemas');

module.exports = (req, res, next) => {
    const inputScenario = new schemas.Scenario(req.body);

    inputScenario.save(err => {
        if (err) {res.send(204, err); return next()}

        res.send(201);
        return next();
    });
};
