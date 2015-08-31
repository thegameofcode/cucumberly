iris.resource(function (self) {
	"use strict";

	var db = new Nedb();

	//
	// Book
	//

	function generateId() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 5; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	self.loadBook = function(callback) {
		db.findOne({}, function(err, book) {
			if (err) return callback(err);

			if (book) {
				callback(null, book);
			} else {
				console.log('Book not found, creating...');
				var defaultBook = {title: 'Book Title', description: 'Book Description', episodes: []};
				db.insert(defaultBook, function(err) {
					if (err) return callback(err);
					callback(null, defaultBook);
				});
			}
		});

		/*setTimeout(function() {
			callback(null, {
				"title": "Nextinit",
				"description": "Book of features",
				"episodes": [
					{
						"id": "Episode1",
						"name": "Login",
						"features": [
							{
								"id": "feature1_1",
								"name": "Login with Chatter",
								"description": {
									"motivation": "use Nextinit features",
									"beneficiary": "a customer",
									"expectedBehaviour": "to log into Nextinit using an existing Chatter account"
								},
								"scenarios": [
									{
										"name": "TAYLOR logs into Nextinit using his Chatter account",
										"steps": {
											"given": [
												"TAYLOR has a Chatter account"
											],
											"when": [
												"TAYLOR logs into Nextinit with his Chatter account"
											],
											"then": [
												"TAYLOR is logged in",
												"the dashboard is displayed"
											]
										}
									}
								]
							}
						]
					}
				]
			});
		}, 1000);*/
	};

	self.updateBook = function(data, callback) {
		setTimeout(function() {
			callback(null, {});
		}, 1000);
	};

	//
	// Episodes
	//

	self.createEpisode = function(data, callback) {
		/*setTimeout(function() {
			callback(null, {
				"id": "episode_123"
			});
		}, 1000);*/

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
		setTimeout(function() {
			callback(null, {});
		}, 1000);
	};

	self.removeEpisode = function(episodeId, callback) {
		setTimeout(function() {
			callback(null, {});
		}, 1000);
	};

	//
	// Features
	//

	self.getFeature = function(episodeId, featureId, callback) {
		self.loadBook(function(err, book) {
			if (err) return callback(err);
			var episode = _.find(book.episodes, {id: episodeId});

			var feature;
			if (episode) {
				feature = _.find(episode.features, {id: featureId});
			}

			callback(null, feature);
		});
	};

	self.createFeature = function(episodeId, data, callback) {
		/*setTimeout(function() {
			callback(null, {
				"id": "feature_123"
			});
		}, 1000);*/

		db.findOne({}, function(err, book) {
			if (err) return callback(err);
			if (!book)  return callback(new Error('Book not found'));

			var episodeDb = book.episodes.filter(function(episode) { return episode.id === episodeId; })[0];
			if (!episodeDb) return callback(new Error('Episode not found'));

			var newFeature = {id: generateId(), name: data.name, description: data.description};
			episodeDb.features.push(newFeature);
			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, newFeature);
			});


			/* Doent work :(
			db.update({'episodes.id': episodeId}, {$push:{'episodes.$.features': newFeature}}, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				db.findOne({}, function(err, book) {console.log('b', book)})
				callback(null, newFeature);
			});*/
		});
	};

	self.updateFeature = function(episodeId, featureId, data, callback) {
		setTimeout(function() {
			callback(null, {});
		}, 1000);
	};

	self.removeFeature = function(episodeId, featureId, callback) {
		setTimeout(function() {
			callback(null, {});
		}, 1000);
	};


	//
	// Scenarios
	//

	self.createScenario = function(episodeId, featureId, data, callback) {
		/*setTimeout(function() {
			callback(null, {
				"id": "scenario_123"
			});
		}, 1000);*/

		db.findOne({}, function(err, book) {
			if (err) return callback(err);
			if (!book)  return callback(new Error('Book not found'));

			var episodeDb = book.episodes.filter(function(episode) { return episode.id === episodeId; })[0];
			if (!episodeDb) return callback(new Error('Episode not found'));

			var featureDb = episodeDb.features.filter(function(feature) { return feature.id === featureId; })[0];
			if (!featureDb) return callback(new Error('Feature not found'));

			var newScenario = {id: generateId(), name: data.name, steps: data.steps};
			featureDb.scenarios.push(newScenario);
			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, newFeature);
			});
		});
	};

	self.updateScenario = function(episodeId, featureId, scenarioId, data, callback) {
		setTimeout(function() {
			callback(null, {});
		}, 1000);

		/*db.findOne({}, function(err, book) {
			if (err) return callback(err);
			if (!book)  return callback(new Error('Book not found'));

			var episodeDb = book.episodes.filter(function(episode) { return episode.id === episodeId; })[0];
			if (!episodeDb) return callback(new Error('Episode not found'));

			var featureDb = episodeDb.features.filter(function(feature) { return feature.id === featureId; })[0];
			if (!featureDb) return callback(new Error('Feature not found'));

			var scenarioDb = featureDb.scenarios.filter(function(scenario) { return scenario.id === scenarioId; })[0];
			if (!scenarioDb) return callback(new Error('Scenario not found'));

			scenarioDb = data;
			db.update({}, book, function(err, numReplaced) {
				if (err) return callback(err);
				if (numReplaced !== 1) return callback(new Error('Error updating book'));
				callback(null, newFeature);
			});
		});*/
	};

	self.removeScenario = function(episodeId, featureId, scenarioId, callback) {
		setTimeout(function() {
			callback(null, {});
		}, 1000);
	};

}, iris.path.resource.book.js);