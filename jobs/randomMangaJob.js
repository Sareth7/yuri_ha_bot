const CronJob = require('cron').CronJob;
const scrap = require("../libs/scrap");
const buttons = require("../libs/inlinebuttons");
const subscribers = require("../libs/subscribers");


module.exports = function() {
	const job = new CronJob("01 0,10,20,30,40,50 * * * *", () => {
		subscribers.getSubscribe( "randomManga" )
			.then(data => {
				const { users } = data;
				scrap.scrapRandomMangaFromReadManga()
					.then(manga => {
						const title = `<strong>${ manga.name }</strong>\n<em>${ manga.alternativeName }</em>`;
						const desc = `\n<pre>${ manga.desc }</pre>`;
						const linkButton = buttons.getInlineKeyBoard({ text: "Читать", url: manga.url });
						users.forEach( user => {
							if( manga.img ){
								this.bot.sendMessage( user, title + desc, { parse_mode: "HTML" });
								this.bot.sendPhoto( user, manga.img, linkButton);
							}else{
								this.bot.sendMessage( user, title + desc, Object.assign({}, { parse_mode: "HTML" }, linkButton));
							}
							
						})
					})
 			})
	})

	return job;
}