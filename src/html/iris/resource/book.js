iris.resource(function (self) {
	"use strict";

	//
	// Book
	//

	self.loadBook = function(callback) {

		setTimeout(function() {
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
		}, 1000);
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
		setTimeout(function() {
			callback(null, {
				"id": "episode_123"
			});
		}, 1000);
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
		setTimeout(function() {
			callback(null, {
				"id": "feature_123"
			});
		}, 1000);
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
		setTimeout(function() {
			callback(null, {
				"id": "scenario_123"
			});
		}, 1000);
	};

	self.updateScenario = function(episodeId, featureId, scenarioId, data, callback) {
		setTimeout(function() {
			callback(null, {});
		}, 1000);
	};

	self.removeScenario = function(episodeId, featureId, scenarioId, callback) {
		setTimeout(function() {
			callback(null, {});
		}, 1000);
	};

}, iris.path.resource.book.js);