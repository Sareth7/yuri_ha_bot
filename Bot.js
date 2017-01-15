const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const getJobs = require("./jobs");
const seeds = require("./models/seeders/initialData");

class Bot {
	constructor( { token = "", options = { polling: true }, jobs, router, callback_router }  = {} )  {
		this.bot = new TelegramBot( token, options );
		if(router) this.router = router;
		if(callback_router) this.callback_router = callback_router;
		if(jobs) this.getJobs(jobs);
	}

	start() {
		mongoose.connect(process.env.DB_TOKEN);
		mongoose.Promise = global.Promise;
		if(this.router) this.bot.on("message", this.router.bind(this));
		if(this.callback_router) this.bot.on("callback_query", this.callback_router.bind(this));
		if(this.jobs) this.startJobs();
	}

	getJobs(jobs) {
		this.jobs = jobs(this);
	}

	startJobs() {
		this.jobs.randomManga.start();
		this.jobs.newManga.start();
		this.jobs.newChapters.start();
	}
}

module.exports = Bot;