const keyboards = require("./keyboards");

function getInlineKeyBoard(...buttons) {
	if(buttons.length) {
		const inline_keyboard = buttons.map(createInlineButton);
		return {
			reply_markup: JSON.stringify({
				inline_keyboard
			})
		}
	}	
}

function createInlineButton(data) {
	const { text, url } = data;
	return [{
		text,
		url
	}]
}

function getKeyBoard(type = "main") {
	return {
		reply_markup: type !== "close" ? JSON.stringify({
			keyboard: keyboards[type],
			resize_keyboard: true
		}) : { remove_keyboard : true}
	}
}

module.exports.getKeyBoard = getKeyBoard;
module.exports.getInlineKeyBoard = getInlineKeyBoard;