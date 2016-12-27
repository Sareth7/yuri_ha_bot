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

function getKeyBoard( msg = {} ) {
	return {
		reply_markup: JSON.stringify({
			keyboard: [
				["Новая манга", "Случайная манга"],
				["Подписка на новую мангу", "Подписка на случайную мангу"],
				["Отписаться от рассылки н.м", "Отписаться от рассылки сл.м"]
			],
			resize_keyboard: true
		})
	}
}

module.exports.getKeyBoard = getKeyBoard;
module.exports.getInlineKeyBoard = getInlineKeyBoard;