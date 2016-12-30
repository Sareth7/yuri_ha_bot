const Manga = require("../Manga");
const Subscribe = require("../Subscribe");
const mongoose = require("mongoose");

module.exports = function() {
	Manga.create({ site: "readmanga.me" });
	Subscribe.create({ action: "newManga" }).then(data => console.log(data));
	Subscribe.create({ action: "randomManga" }).then(data => console.log(data));
}