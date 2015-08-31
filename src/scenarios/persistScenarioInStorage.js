'use strict';

const updateInStorage = require('../storage/updateInStorage.js');

module.exports = (featureId, scenarioBody) => {
	return updateInStorage({id: featureId}, {$push: {'scenarios': scenarioBody}});
};
