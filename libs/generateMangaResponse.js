const MangaAPI = require("./mangaAPI");
const checkMangaList = require("./checkMangaList");
const scrap = require("./scrap");
const buttons = require("./buttons");

module.exports.getNewMangaListResponse = function( data, site, mangaName = "" ) {
	const titleText =  mangaName ? `${mangaName} новые главы!` : `Последние поступления с ${site}`;
	const title = `<strong>\u{1F4E2}${titleText}</strong>`
	const mangaList = buttons.getInlineKeyBoard(...data);
	const options = Object.assign({}, {
				parse_mode: "HTML",
				disable_web_page_preview: true
	}, mangaList);

	return { title, options }
}

module.exports.getRandomMangaResponse = function( manga, site = "readmanga.me") {
	const { name, alternativeName, desc, url, img } = manga;
	const linkButton = buttons.getInlineKeyBoard(
		{ text: "\u{1F4C6}Подписаться", callback_data: `sub;${url}` },
		{ text: "\u{1F4DC}Читать", url }
	);
	const messageTitle = `<strong>${ manga.name }</strong>\n<em>${ manga.alternativeName }</em>`;
	const messageBody = `<pre>${ manga.desc }</pre>`;
	const message = `${messageTitle}\n${messageBody}`;
	return { message, linkButton, img };
}

module.exports.getNewMangaJobAction = function( site, count, mangaName = "", chapters = false ) {
	let promise = new Promise((resolve, reject) => {
		Promise.all([MangaAPI.getManga(site, mangaName, chapters), scrap.scrapNewMangaFromReadManga(count, mangaName)])
			.then(([mangaFromDB, nextManga]) => {
				const { last_titles: previousManga } = mangaFromDB.toJSON();
				const mangaList = checkMangaList(previousManga, nextManga);
				if(mangaList) {
					const { newData, unionData } = mangaList;
					MangaAPI.updateLastTitles(site, unionData, mangaName, chapters);
					resolve(newData);
				}else{
					resolve(mangaList);
				}
			})
	})
	
	return promise;
}

module.exports.getNewMangaUserAction = function( site, count ) {
	let promise = scrap.scrapNewMangaFromReadManga(count)
	return promise;
}