const MangaAPI = require("./mangaAPI");
const checkMangaList = require("./checkMangaList");
const scrap = require("./scrap");
const buttons = require("./buttons");

module.exports.getNewMangaListResponse = function( data, site ) {
	const title =  `<strong>\u{1F4E2}Последние поступления с ${site}</strong>`;
	const mangaList = buttons.getInlineKeyBoard(...data);
	const options = Object.assign({}, {
				parse_mode: "HTML",
				disable_web_page_preview: true
	}, mangaList);

	return { title, options }
}

module.exports.getRandomMangaResponse = function( manga, site = "readmanga.me") {
	const { name, alternativeName, desc, url, img } = manga;
	const linkButton = buttons.getInlineKeyBoard({ text: "Читать", url });
	const messageTitle = `<strong>${ manga.name }</strong>\n<em>${ manga.alternativeName }</em>`;
	const messageBody = `<pre>${ manga.desc }</pre>`;
	const message = `${messageTitle}\n${messageBody}`;
	return { message, linkButton, img };
}

module.exports.getNewMangaJobAction = function( site, count ) {
	let promise = new Promise((resolve, reject) => {
		Promise.all([MangaAPI.getManga(site), scrap.scrapNewMangaFromReadManga(count)])
			.then(([mangaFromDB, nextManga]) => {
				const { last_titles: previousManga } = mangaFromDB.toJSON();
				const mangaList = checkMangaList(previousManga, nextManga);
				if(mangaList) {
					const { newData, unionData } = mangaList;
					MangaAPI.updateLastTitles(site, unionData);
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