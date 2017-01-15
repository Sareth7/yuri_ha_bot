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

function getInlineKeyBoardFromArrayOfButtons(buttons) {
	return {
		reply_markup: JSON.stringify({
			inline_keyboard: buttons
		})
	}
}

function createInlineButton(data) {
	const { text, url = "", callback_data = false } = data;
	if(url)
		return [{ text, url }]
	
	return [{ text, callback_data }]
}

function getKeyBoard(type = "main") {
	return {
		reply_markup: type !== "close" ? JSON.stringify({
			keyboard: keyboards[type],
			resize_keyboard: true,
			one_time_keyboard: true
		}) : { remove_keyboard : true}
	}
}

module.exports.getKeyBoard = getKeyBoard;
module.exports.getInlineKeyBoard = getInlineKeyBoard;
module.exports.getInlineKeyBoardFromArrayOfButtons = getInlineKeyBoardFromArrayOfButtons;