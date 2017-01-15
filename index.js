const Bot = require("./Bot");
const router = require("./routes");
const callback_router = require("./routes/callback_router");
const jobs = require("./jobs");


const MangaBot = new Bot({
	token: process.env.BOT_TOKEN,
	router,
	jobs,
	callback_router
});

MangaBot.start();