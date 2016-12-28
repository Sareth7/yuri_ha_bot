const Manga = require("../models/Manga");

module.exports.getManga = function( site ) {
	return new Promise((resolve, reject) => {
		Manga
			.findOne({site})
			.select("site last_titles last_titles.url last_titles.text")
			.limit(1)
			.then(manga => {
				manga = manga.toJSON();
				resolve({previousManga: manga.last_titles})
			})
	})
}

module.exports.updateLastTitles = function( site, newManga ) {
	Manga
		.update(
			{site},
			{$set: { last_titles: newManga }},
			{ safe: true, upsert: true, new: false }
		)
		.then(data => console.log(data))
}