const scrap = require("../libs/scrap");
const buttons = require("../libs/inlinebuttons");
const destructMsg = require("../libs/destructMsg");

function newManga( msg ) {
	const chatId = destructMsg.getChatId(msg);

	scrap.scrapNewMangaFromReadManga(25)
		.then( data => {
			const title =  "<strong>Последние поступления с readmanga.me</strong>";
			const mangaList = buttons.getInlineKeyBoard(...data);
			const options = Object.assign({}, {
				parse_mode: "HTML",
				disable_web_page_preview: true
			}, mangaList);

			this.bot.sendMessage(chatId, title, options);
		})
}

function randomManga( msg ) {
	const chatId = destructMsg.getChatId(msg);
	
	scrap.scrapRandomMangaFromReadManga()
		.then( manga => {
			const title = `<strong>${ manga.name }</strong>\n<em>${ manga.alternativeName }</em>`;
			const desc = `\n<pre>${ manga.desc }</pre>`;
			const linkButton = buttons.getInlineKeyBoard({ text: "Читать", url: manga.url });
			if( manga.img ){
				this.bot.sendMessage( chatId, title + desc, { parse_mode: "HTML" });
				this.bot.sendPhoto( chatId, manga.img, linkButton);
			}else{
				this.bot.sendMessage( chatId, title + desc, Object.assign({}, { parse_mode: "HTML" }, linkButton));
			}
		})
}

module.exports = {
	newManga,
	randomManga
}