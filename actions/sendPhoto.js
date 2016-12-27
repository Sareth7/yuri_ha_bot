const request = require("request");

module.exports = function( msg ) {
	const { chat : { id : chatId, first_name } } = msg;
	const url = "https://source.unsplash.com/random";

	this.bot.sendMessage(chatId, `${first_name} подожди немного, загружаю фотку...`);
	request
		.get(url)
		.on("response", (res) => {
			const { request: { uri: { href } } } = res.toJSON();
			this.bot.sendMessage(chatId, "получай фотку!");
			this.bot.sendPhoto(chatId, href);
		})
}