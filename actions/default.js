const buttons = require("../libs/buttons");

module.exports = function( msg ) {
	const { chat : { id : chatId, first_name } } = msg;
	const keyBoard = buttons.getKeyBoard();
	this.bot.sendMessage(chatId, `${first_name}, я тебя не понимаю!`, keyBoard);
}