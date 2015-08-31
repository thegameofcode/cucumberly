iris.screen(function (self) {

	var bookResource = iris.resource(iris.path.resource.book.js);

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		self.ui('episodeMenu', iris.path.ui.episodeMenu.js);

		self.screens('screens', [
			['episode/:episodeId/feature/:featureId', iris.path.screen.feature.js]
		]);

		bookResource.loadBook(onLoadBook);
	};

	function onLoadBook(err, book) {
		if (err) return console.error(err);
		self.ui('episodeMenu').setEpisodes(book.episodes);
	}

},iris.path.screen.welcome.js);
