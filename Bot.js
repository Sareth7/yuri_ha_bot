const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const getJobs = require("./jobs");

class Bot {
	constructor( { token = "", router = ( msg ) => {}, options = { polling: true } }  = {} )  {
		this.bot = new TelegramBot( token, options );
		this.router = router;
		this.getJobs();
	}

	start() {
		mongoose.connect(process.env.DB_TOKEN);
		mongoose.Promise = global.Promise;

		this.bot.on("message", this.router.bind(this));
		
		this.startJobs();
	}

	getJobs() {
		this.jobs = getJobs(this);
	}

	startJobs() {
		this.jobs.randomManga.start();
		this.jobs.newManga.start();
	}
}

module.exports = Bot;