const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
	site: { type: String, default: "http://readmanga.me" },
	manga: { type: String, unique: true },
	last_titles: [{
		text: String,
		url: String
	}]
})

module.exports = mongoose.model("Chapter", ChapterSchema);