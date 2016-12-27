const randomMangaJob = require("./randomMangaJob");
const newMangaJob = require("./newMangaJob");

module.exports = function ( ctx ) {
	if(!ctx) throw new Error("Context is not default");
	return {
		randomManga: randomMangaJob.call(ctx),
		newManga: newMangaJob.call(ctx)
	}
}