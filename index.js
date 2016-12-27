const Bot = require("./Bot");
const router = require("./routes");

const MangaBot = new Bot({
	token: process.env.BOT_TOKEN,
	router
});
MangaBot.start();