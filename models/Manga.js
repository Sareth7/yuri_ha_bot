const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
	site: { type: String, unique: true },
	last_titles: [{
		text: String,
		url: String
	}]
})

module.exports = mongoose.model("Manga", MangaSchema);