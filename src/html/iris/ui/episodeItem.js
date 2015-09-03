iris.ui(function (self) {
	"use strict";

	var book = iris.resource(iris.path.resource.book.js);

	self.create = function() {
		self.tmpl(iris.path.ui.episodeItem.html);

		var id = 'episode_' + Math.random().toString(36).substring(7);
		self.get('accordionBody').attr('id', id);
		self.get('accordionItem').attr('data-target', '#' + id);

		self.ui('episodeName', iris.path.ui.editableLabel.js, {defaultText: 'New episode'}).on('change', onEpisodeChange);

		var episode = self.setting('episode');
		self.ui('episodeName').text(episode.name);
		iris.log('Creating episode ', episode.name);
		if (episode.features && episode.features.length > 0) {
			episode.features.forEach(function(feature) {
				iris.log(' -> feature', feature);
				addFeatureItem(episode, feature);
			});
		}

		self.ui('episodeName').text(self.setting('episode').name);

		self.get('btnAddFeature').on('click', onBtnAddFeatureClick);
		UIBtn.init(self.get());
	};

	function onBtnAddFeatureClick() {
		var name = 'New feature';
		book.createFeature(self.setting('episode').id, {name: name, description:{motivation: 'Motivation', beneficiary: 'Beneficiary', expectedBehaviour: 'Expected behaviour'}}, function(err, feature) {
			if (err) return alert(err);
			var episode = self.setting('episode');
			addFeatureItem(episode, feature, true);
		});
	}

	function addFeatureItem(episode, feature, navigate) {
		var featureUrl = '#/episode/' + episode.id + '/feature/' + feature.id;
		self.ui('listFeatures', iris.path.ui.featureItem.js, {episode: episode, feature: feature, url: featureUrl}, self.APPEND);
		if (navigate) iris.navigate(featureUrl);
	}

	function onEpisodeChange() {
		book.updateEpisode(self.setting('episode').id, {name: self.ui('episodeName').text()}, function(err, result) {
			if (err) return alert('Error saving episode');
			iris.log('Episode updated');
		});
	}

}, iris.path.ui.episodeItem.js);
