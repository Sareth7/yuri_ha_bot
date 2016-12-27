const CronJob = require('cron').CronJob;
const scrap = require("../libs/scrap");
const buttons = require("../libs/inlinebuttons");
const subscribers = require("../libs/subscribers");

module.exports = function() {
	const job = new CronJob("01 25,55 * * * *", () => {
		subscribers.getSubscribe( "newManga" )
			.then(data => {
				const { users } = data;
				scrap.scrapNewMangaFromReadManga(11)
					.then(manga => {
						const text =  "<strong>Последние поступления с readmanga.me</strong>";
						const mangaListButtons = buttons.getInlineKeyBoard(...manga);
						const options = Object.assign({}, {
							parse_mode: "HTML",
							disable_web_page_preview: true
						}, mangaListButtons);

						users.forEach(user => {this.bot.sendMessage(user, text, options)});
					})
			})
	})

	return job;
}