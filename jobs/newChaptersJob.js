const CronJob = require('cron').CronJob;
const _ = require("lodash");
const MangaAPI = require("../libs/mangaAPI");
const subscribers = require("../libs/subscribers");
const generateMangaResponse = require("../libs/generateMangaResponse");

module.exports = function() {
	const job = new CronJob("03 11 8-23 * * *", () => {
		const site = "http://readmanga.me";
		MangaAPI.getAllManga(site)
			.then(data => _.each(data, item => {
				console.log(item)
				Promise.all([subscribers.getSubscribe(item.manga), generateMangaResponse.getNewMangaJobAction(site, 11, item.manga, true)])
					.then(([actionData, manga]) => {
						const { users } = actionData;
						if(manga && manga.length) {
							const { title, options } = generateMangaResponse.getNewMangaListResponse(manga, site, item.manga);
							users.forEach(user => {this.bot.sendMessage(user, title, options)});
						}
					})
					.catch(err => console.log(err))
			}))
	})
	return job;
}