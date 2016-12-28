const buttons = require("../libs/buttons");

module.exports = function( msg, type = "main") {
	const { chat : { id : chatId } } = msg;
	const keyboard = buttons.getKeyBoard( type );
	this.bot.sendMessage(chatId, `переключился на [${type} keyboard]`, keyboard);
}