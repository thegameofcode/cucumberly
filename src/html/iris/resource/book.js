iris.resource(function (self) {
	"use strict";

	var db = new Nedb({filename: 'cucumberly', autoload: true});

	//
	// Book
	//

	self.loadBook = function(callback) {
		db.findOne({}, function(err, book) {
			if (err) return callback(err);

			if (book) {
				callback(null, book);
			} else {
				console.log('Book not found, creating...');
				var defaultBook = {id: generateId(), title: '', description: '', episodes: []};
				db.insert(defaultBook, function(err, book) {
					if (err) return callback(err);
					callback(null, book);
				});
			}
		});
	};

	self.updateBook = function(data, callback) {
		db.update({}, {$set: {title: data.title, description: data.description}}, function(err, numReplaced) {
			if (err) return callback(err);
			if (numReplaced != 1) return callback(new Error('Error updating book data'));
			callback();
		});
	};

	//
	// Episodes
	//

	self.createEpisode = function(data, callback) {
		db.findOne({}, function(err, book) {
			if (err) return callback(err);
			if (!book)  return callback(new Error('Book not found'));

			var newEpisode = {id: generateId(), name: data.name, features: []};
			db.update({}, {$push:{episodes: newEpisode}}, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, newEpisode);
			});
		});
	};

	self.updateEpisode = function(episodeId, data, callback) {
		getEpisode(episodeId, function(err, book, episode) {
			if (err) return callback(err);

			episode.name = data.name;

			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, episode);
			});
		});
	};

	self.removeEpisode = function(episodeId, callback) {
		db.findOne({}, function(err, book) {
			if (err) return callback(err);
			if (!book)  return callback(new Error('Book not found'));

			book.episodes = _.remove(book.episodes, {id: episodeId});

			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null);
			});
		});
	};

	//
	// Features
	//

	self.getFeature = function(episodeId, featureId, callback) {
		getFeature(episodeId, featureId, function(err, book, feature) {
			if (err) return callback(err);
			callback(null, feature);
		});
	};

	self.createFeature = function(episodeId, data, callback) {
		getEpisode(episodeId, function(err, book, episode) {
			if (err) return callback(err);

			var newFeature = {id: generateId(), name: data.name, description: data.description, scenarios: []};
			episode.features.push(newFeature);

			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, newFeature);
			});
		});
	};

	self.updateFeature = function(episodeId, featureId, data, callback) {
		getFeature(episodeId, featureId, function(err, book, feature) {
			if (err) return callback(err);

			feature.name = data.name;
			feature.description = data.description;

			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, feature);
			});
		});
	};

	self.removeFeature = function(episodeId, featureId, callback) {
		getEpisode(episodeId, function(err, book, episode) {
			if (err) return callback(err);

			episode.features = _.remove(episode.features, {id: featureId});

			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null);
			});
		});
	};


	//
	// Scenarios
	//

	self.createScenario = function(episodeId, featureId, data, callback) {
		getFeature(episodeId, featureId, function(err, book, feature) {
			if (err) return callback(err);

			var newScenario = {id: generateId(), name: data.name, steps: data.steps};
			feature.scenarios.push(newScenario);
			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, newScenario);
			});
		});
	};

	self.updateScenario = function(episodeId, featureId, scenarioId, data, callback) {
		getFeature(episodeId, featureId, function(err, book, feature) {
			if (err) return callback(err);

			var scenario = _.find(feature.scenarios, {id: scenarioId});
			if (!scenario) return callback(new Error('Scenario not found'));

			scenario.name = data.name;
			scenario.steps = data.steps;

			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, scenario);
			});
		});
	};

	self.removeScenario = function(episodeId, featureId, scenarioId, callback) {
		getFeature(episodeId, featureId, function(err, book, feature) {
			if (err) return callback(err);

			feature.scenarios = _.remove(feature.scenarios, {id: scenarioId});

			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null);
			});
		});
	};

	//
	// Private
	//

	function generateId() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}

	function getEpisode(episodeId, callback) {
		db.findOne({}, function(err, book) {
			if (err) return callback(err);
			if (!book)  return callback(new Error('Book not found'));

			var episode = _.find(book.episodes, {id: episodeId});
			if (!episode) return callback(new Error('Episode not found'));

			callback(null, book, episode);
		});
	}

	function getFeature(episodeId, featureId, callback) {
		getEpisode(episodeId, function(err, book, episode) {
			if (err) return callback(err);

			var feature = _.find(episode.features, {id: featureId});
			if (!feature) return callback(new Error('Feature not found'));

			callback(null, book, feature);
		});
	}

}, iris.path.resource.book.js);