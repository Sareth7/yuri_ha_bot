const randomMangaJob = require("./randomMangaJob");
const newMangaJob = require("./newMangaJob");
const newChapters = require("./newChaptersJob");

module.exports = function ( ctx ) {
	if(!ctx) throw new Error("Context is not default");
	return {
		randomManga: randomMangaJob.call(ctx),
		newManga: newMangaJob.call(ctx),
		newChapters: newChapters.call(ctx)
	}
}