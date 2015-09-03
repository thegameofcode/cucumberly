iris.ui(function (self) {
	"use strict";

	var book = iris.resource(iris.path.resource.book.js);

	self.create = function() {
		self.tmpl(iris.path.ui.episodeMenu.html);

		self.get('btnAddEpisode').on('click', onAddEpisode);
		UIBtn.init(self.get());
	};

	self.setEpisodes = function(episodes) {
		if (!episodes || episodes.length === 0) {
			return;
		}

		iris.log('episodes', episodes);
		episodes.forEach(function(episode) {
			self.ui('items', iris.path.ui.episodeItem.js, {episode: episode}, self.APPEND);
		});
	};

	function onAddEpisode() {
		var episode = {name: 'New episode'};
		book.createEpisode(episode, function(err, result) {
			if (err) return alert('Error creating episode');
			episode.id = result.id;
			self.ui('items', iris.path.ui.episodeItem.js, {episode: episode}, self.APPEND);
			iris.log('Episode created');
		});
	}

}, iris.path.ui.episodeMenu.js);
