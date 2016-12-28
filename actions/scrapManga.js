const scrap = require("../libs/scrap");
const buttons = require("../libs/buttons");
const destructMsg = require("../libs/destructMsg");

const generateMangaResponse = require("../libs/generateMangaResponse");

function newManga( msg ) {
	const chatId = destructMsg.getChatId(msg);
	const site = "readmanga.me";
	
	generateMangaResponse.getNewMangaUserAction(site)
		.then(manga => {
			if(manga) {
				const { title, options } = generateMangaResponse.getNewMangaListResponse(manga, site);
				this.bot.sendMessage(chatId, title, options);
			}else{
				this.bot.sendMessage(chatId, "Новых поступлений пока нет");
			}
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