const CronJob = require('cron').CronJob;
const scrap = require("../libs/scrap");
const buttons = require("../libs/buttons");
const subscribers = require("../libs/subscribers");
const generateMangaResponse = require("../libs/generateMangaResponse");

module.exports = function() {
	const job = new CronJob("01 0,5,10,15,20,25,30,35,40,45,50,55 * * * *", () => {
		subscribers.getSubscribe( "newManga" )
			.then(data => {
				const { users } = data;
				const site = "readmanga.me";
				generateMangaResponse.getNewMangaJobAction(site)
					.then(manga => {
						if(manga && manga.length) {
							const { title, options } = generateMangaResponse.getNewMangaListResponse(manga, site);
							users.forEach(user => {this.bot.sendMessage(user, title, options)});
						}
					})
			})
	})

	return job;
}