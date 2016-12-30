const scrap = require("../libs/scrap");
const buttons = require("../libs/buttons");
const destructMsg = require("../libs/destructMsg");

const generateMangaResponse = require("../libs/generateMangaResponse");

function newManga( msg ) {
	const site = "readmanga.me";
	const chatId = destructMsg.getChatId(msg);
	const keyboard = buttons.getKeyBoard();
	
	generateMangaResponse.getNewMangaUserAction(site, 11)
		.then(manga => {
			if(manga) {
				const { title, options } = generateMangaResponse.getNewMangaListResponse(manga, site);
				this.bot.sendMessage(chatId, title, options);
				this.bot.sendMessage(chatId, "Чего еще угодно семпай?", keyboard);
			}else{
				this.bot.sendMessage(chatId, "Новых поступлений пока нет", keyboard);
			}
		})
}

function randomManga( msg ) {
	const chatId = destructMsg.getChatId(msg);
	const keyboard = buttons.getKeyBoard();
	
	scrap.scrapRandomMangaFromReadManga()
		.then( manga => {
			console.log("[randomManga]",manga);
			const { message, linkButton, img } = generateMangaResponse.getRandomMangaResponse(manga);
			if( img ){
				this.bot.sendPhoto( chatId, img, linkButton);
				this.bot.sendMessage( chatId, message, Object.assign({ parse_mode: "HTML" }, keyboard));
			}else{
				this.bot.sendMessage( chatId, message, Object.assign({}, { parse_mode: "HTML" }, linkButton));
			}
		})
}

module.exports = {
	newManga,
	randomManga
}