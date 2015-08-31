'use strict';

const updateInStorage = require('../storage/updateInStorage.js');

module.exports = (featureId, elementsToUpdate) => {
	const updateQuery = {$set: createFieldToBeUpdated(elementsToUpdate)};

	return updateInStorage({id: featureId}, updateQuery);
};


function createFieldToBeUpdated(elementsToUpdate){
	let fieldToBeUpdated = {};
	if (elementsToUpdate.name !== undefined) {
		fieldToBeUpdated['name'] = elementsToUpdate.name;
	}

	if (elementsToUpdate.beneficiary !== undefined) {
		fieldToBeUpdated['beneficiary'] = elementsToUpdate.beneficiary;
	}

	if (elementsToUpdate.motivation !== undefined) {
		fieldToBeUpdated['motivation'] = elementsToUpdate.motivation;
	}

	if (elementsToUpdate.expectedBehaviour !== undefined) {
		fieldToBeUpdated['expectedBehaviour'] = elementsToUpdate.expectedBehaviour;
	}

	return fieldToBeUpdated;
}