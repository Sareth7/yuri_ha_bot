const Manga = require("../models/Manga");
const Subscribe = require("../models/Subscribe");

module.exports = function() {
	Manga.create({ site: "readmanga.me" });
	Subscribe.create({ action: "newManga" });
	Subscribe.create({ action: "randomManga" });
}