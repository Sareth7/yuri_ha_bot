const CronJob = require('cron').CronJob;
const scrap = require("../libs/scrap");
const buttons = require("../libs/buttons");
const subscribers = require("../libs/subscribers");
const generateMangaResponse = require("../libs/generateMangaResponse");


module.exports = function() {
	const job = new CronJob("01 0,5,10,15,20,25,30,35,40,45,50,55 * * * *", () => {
		const actionType = "newManga";
		const site = "readmanga.me";
		Promise.all([subscribers.getSubscribe(actionType), generateMangaResponse.getNewMangaJobAction(site, 11)])
			.then(([actionData, manga]) => {
				const { users } = actionData;
				if(manga && manga.length) {
					const { title, options } = generateMangaResponse.getNewMangaListResponse(manga, site);
					users.forEach(user => {this.bot.sendMessage(user, title, options)});
				}
			})	
	})

	return job;
}