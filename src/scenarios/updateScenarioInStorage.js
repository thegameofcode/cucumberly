'use strict';

const updateInStorage = require('../storage/updateInStorage.js');

module.exports = (featureId, scenarioId, elementsToUpdate) => {
	const updateQuery = {$set: createFieldToBeUpdated(scenarioId, elementsToUpdate)};

	return updateInStorage({id: featureId}, updateQuery);
};

function createFieldToBeUpdated(scenarioId, elementsToUpdate){
	let fieldToBeUpdated = {};
	if (elementsToUpdate.name !== undefined) {
		fieldToBeUpdated['scenarios.' + scenarioId +'.name'] = elementsToUpdate.name;
	}

	if (elementsToUpdate.steps !== undefined && elementsToUpdate.steps.given !== undefined) {
		fieldToBeUpdated['scenarios.' + scenarioId +'.steps.given'] = elementsToUpdate.steps.given;
	}

	if (elementsToUpdate.steps !== undefined && elementsToUpdate.steps.when !== undefined) {
		fieldToBeUpdated['scenarios.' + scenarioId +'.steps.when'] = elementsToUpdate.steps.when;
	}

	if (elementsToUpdate.steps !== undefined && elementsToUpdate.steps.then !== undefined) {
		fieldToBeUpdated['scenarios.' + scenarioId +'.steps.then'] = elementsToUpdate.steps.then;
	}

	return fieldToBeUpdated;
}