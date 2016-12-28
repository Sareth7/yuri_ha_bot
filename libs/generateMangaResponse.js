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

module.exports.getNewMangaJobAction = function( site ) {
	let promise = new Promise((resolve, reject) => {
		let manga = {};
		MangaAPI.getManga(site)
			.then(data => Object.assign(manga, data))
			.then(data => scrap.scrapNewMangaFromReadManga(11))
			.then(data => Object.assign(manga, data))
			.then(data => {
					const { previousManga, nextManga } = manga;
					const mangaList = checkMangaList(previousManga, nextManga);
					if(mangaList) {
						console.log(mangaList);
						const { newData, unionData } = mangaList;
						MangaAPI.updateLastTitles(site, unionData);
						resolve(newData);
					}else{
						resolve(mangaList)
					}
					
			})
	})
	
	return promise;
}

module.exports.getNewMangaUserAction = function( site ) {
	let promise = new Promise((resolve, reject) => {
		MangaAPI.getManga(site)
			.then(manga => {
				const { previousManga } = manga;
				if(previousManga.length){
					resolve(previousManga);
				}else{
					resolve(false);
				}
			})
	})

	return promise;
}