const Manga = require("../models/Manga");
const Chapter = require("../models/Chapter");

module.exports.getManga = function(site, mangaName = "", chapters = false) {
	if(mangaName && chapters) {
		var promise = Chapter
			.findOne({ site, manga:mangaName })
			.select("_id site manga last_titles last_titles.url last_titles.text")
			.limit(1)
	}else{
		var promise = Manga
			.findOne({site})
			.select("site last_titles last_titles.url last_titles.text")
			.limit(1)
	}
			
	return promise;
}

module.exports.updateLastTitles = function( site, newManga, mangaName = "", chapters = false) {
	if(mangaName && chapters) {
		Chapter
			.update(
				{site, manga:mangaName},
				{$set: { last_titles: newManga }},
				{ safe: true, upsert: true, new: false }
			)
			.then(data => console.log(data))
	}else{
		Manga
			.update(
				{site},
				{$set: { last_titles: newManga }},
				{ safe: true, upsert: true, new: false }
			)
			.then(data => console.log(data))
	}
}

module.exports.getAllManga = function(site) {
	var promise = Chapter
		.find({site})
		.select("_id manga")

	return promise;
}