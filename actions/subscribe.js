const subscribers = require("../libs/subscribers");
const buttons = require("../libs/buttons");

module.exports.subscribe = function( msg ) {
	const { action, chat: { id: chatId, first_name } } = msg;
	const keyboard = buttons.getKeyBoard("sub");
	const options = Object.assign({ parse_mode: "HTML" }, keyboard);
	let text = `${first_name}, подожди немного, пробую подписаться на событие <code>[${action}]</code>...`;
	this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });

	subscribers.checkAction(action)
		.then(data => subscribers.checkUserSub(action, chatId, false))
		.then(data => subscribers.subscribeToAction(action, chatId))
		.then(data => {
			let text = `${first_name}, ты успешно подписался на событие <code>[${action}]</code>`;
			this.bot.sendMessage(chatId, text, options);
		})
		.catch(data => {
			let text = `${first_name}, ты уже подписан на это событие <code>[${action}]</code>`;
			this.bot.sendMessage(chatId, text, options);
		})
}

module.exports.unsubscribe = function( msg ) {
	const { action, chat: { id: chatId, first_name } } = msg;
	const keyboard = buttons.getKeyBoard("unsub");
	const options = Object.assign({ parse_mode: "HTML" }, keyboard);
	let text = `${first_name}, подожди немного, пробую отписаться от события <code>[${action}]</code>...`;
	this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });

	subscribers.checkUserSub(action, chatId, true)
		.then(data => subscribers.unsubscribeToAction(action, chatId))
		.then(data => {
			let text = `${first_name}, ты успешно отписался от события <code>[${action}]</code>`;
			this.bot.sendMessage(chatId, text, options);
		})
		.catch(data => {
			let text = `${first_name}, ты еще не подписан на это событие <code>[${action}]</code>`;
			this.bot.sendMessage(chatId, text, options);
		})
}