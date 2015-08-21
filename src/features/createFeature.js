'use strict';

module.exports = (request, response, next) => {
    response.json(201);
    return next();
};
