iris.screen(function (self) {

	var bookResource = iris.resource(iris.path.resource.book.js);

	self.create = function() {
		self.tmpl(iris.path.screen.welcome.html);

		self.ui('episodeMenu', iris.path.ui.episodeMenu.js);

		self.screens('screens', [
			['episode/:episodeId/feature/:featureId', iris.path.screen.feature.js]
		]);

		self.ui('bookTitle', iris.path.ui.editableLabel.js, {defaultText: 'Book Name'}).on('change', onBookChange);
		self.ui('bookDes', iris.path.ui.editableLabel.js, {defaultText: 'Book Description'}).on('change', onBookChange);

		bookResource.loadBook(onLoadBook);
	};

	function onLoadBook(err, book) {
		if (err) return alert('Error loading book data');
		iris.log('book ->', book);
		self.ui('bookTitle').text(book.title);
		self.ui('bookDes').text(book.description);
		self.ui('episodeMenu').setEpisodes(book.episodes);
	}

	function onBookChange() {
		bookResource.updateBook({title: self.ui('bookTitle').text(), description: self.ui('bookDes').text()}, function(err, res) {
			if (err) return alert('Error updating book data');
			iris.log('Book updated');
		})
	}

},iris.path.screen.welcome.js);
