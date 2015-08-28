'use strict';

const updateInStorage = require('../storage/updateInStorage.js');

module.exports = (featureId, scenarioId, elementsToUpdate) => {
	const queryToFindElement = {id: featureId, 'scenarios.id': scenarioId}
	const updateQuery = {$set: createFieldToBeUpdated(scenarioId, elementsToUpdate)};

	return updateInStorage(queryToFindElement, updateQuery);
};

function createFieldToBeUpdated(scenarioId, elementsToUpdate){
	let fieldToBeUpdated = {};
	if (elementsToUpdate.name !== undefined) {
		fieldToBeUpdated['scenarios.$.name'] = elementsToUpdate.name;
	}

	if (elementsToUpdate.steps !== undefined && elementsToUpdate.steps.given !== undefined) {
		fieldToBeUpdated['scenarios.$.steps.given'] = elementsToUpdate.steps.given;
	}

	if (elementsToUpdate.steps !== undefined && elementsToUpdate.steps.when !== undefined) {
		fieldToBeUpdated['scenarios.$.steps.when'] = elementsToUpdate.steps.when;
	}

	if (elementsToUpdate.steps !== undefined && elementsToUpdate.steps.then !== undefined) {
		fieldToBeUpdated['scenarios.$.steps.then'] = elementsToUpdate.steps.then;
	}

	return fieldToBeUpdated;
}