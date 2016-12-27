const start = require("./start");
const help = require("./help");
const defaultAction = require("./default"); 
const sendPhoto = require("./sendPhoto");
const scrap = require("./scrapManga");
const subscribe = require("./subscribe");


module.exports = {
	start,
	help,
	sendPhoto,
	scrap,
	subscribeActions: subscribe,
	default: defaultAction
}