const start = require("./start");
const help = require("./help");
const defaultAction = require("./default"); 
const sendPhoto = require("./sendPhoto");
const scrap = require("./scrapManga");
const subscribe = require("./subscribe");
const switchKeyboard = require("./switchKeyboard");

module.exports = {
	start,
	help,
	sendPhoto,
	scrap,
	switchKeyboard,
	subscribeActions: subscribe,
	default: defaultAction
}