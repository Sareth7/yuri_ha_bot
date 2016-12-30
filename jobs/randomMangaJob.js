const CronJob = require('cron').CronJob;
const scrap = require("../libs/scrap");
const buttons = require("../libs/buttons");
const subscribers = require("../libs/subscribers");
const getRandomMangaResponse = require("../libs/generateMangaResponse").getRandomMangaResponse;

module.exports = function() {
	const job = new CronJob("03 07 8-23 * * *", () => {
		Promise.all([subscribers.getSubscribe( "randomManga" ), scrap.scrapRandomMangaFromReadManga()])
			.then(([{ users }, manga]) => {
				console.log("[randomManga]", manga);
				const { message, linkButton, img } = getRandomMangaResponse(manga);
				users.forEach(userId => {
					if( img ){
						this.bot.sendPhoto(userId, img, linkButton);
						this.bot.sendMessage(userId, message, { parse_mode: "HTML" });
					}else{
						this.bot.sendMessage(userId, message, Object.assign({ parse_mode: "HTML" }, linkButton));
					}
				})
			})
	})

	return job;
}
