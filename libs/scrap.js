const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

function scrapManga(url, callback){
	return new Promise(function(resolve, reject) {
		request(url, function(error, response, body) {
			if(!error) {
				const $ = cheerio.load(body);
				resolve(callback( $, response ))
			}else{
				reject("Что-то пошло не так")
			}
		})
	})
}

function scrapNewMangaFromReadManga(count = 10, mangaName = false){
	const options = { 
		url: "http://readmanga.me", 
		chapters: "table.newChapters tbody tr", 
		baseUrl: "http://readmanga.me" };
	if(mangaName) {
		options.url = `${options.baseUrl}/${mangaName}`;
		options.chapters = "table.table.table-hover > tr";
	}
	return scrapManga(options.url, ( $ ) => {
		const regExp = /([А-яA-z0-9\-]+)/g;
		const response = [];
		const chapters = $(options.chapters).slice(0, count);
		chapters.each((index, el) => {
			let link = $(el).find("td a");
			let href = options.baseUrl + link.attr("href");
			let text = link.text().match(regExp).join(" ");
			response.push(createManga(text, href));
		})
		return response;
	})
}

function scrapRandomMangaFromReadManga(){
	const url = "http://readmanga.me/internal/random";
	return scrapManga(url, ( $ ) => {
		const manga = $("#mangaBox .leftContent");
		const name = manga.find("meta[itemprop='name']").attr("content");
		const alternativeName = manga.find("meta[itemprop='alternativeHeadline']").attr("content");
		const url = manga.find("meta[itemprop='url']").attr("content");
		const desc = manga.find("meta[itemprop='description']").attr("content");
		const img = manga.find("div.picture-fotorama").children("img").first().attr("src");

		return { name, alternativeName, url, desc, img };
	})
}

function createManga(text, url){
	return { text, url }
}

module.exports.scrapNewMangaFromReadManga = scrapNewMangaFromReadManga;
module.exports.scrapRandomMangaFromReadManga = scrapRandomMangaFromReadManga;