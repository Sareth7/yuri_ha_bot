const Manga = require("../models/Manga");

module.exports.getManga = function( site ) {
	let promise = Manga
		.findOne({site})
		.select("site last_titles last_titles.url last_titles.text")
		.limit(1)
			
	return promise;
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