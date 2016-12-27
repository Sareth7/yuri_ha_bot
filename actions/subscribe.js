const subscribers = require("../libs/subscribers");

module.exports.subscribe = function( msg ) {
	const { action, chat: { id: chatId, first_name } } = msg;
	let text = `${first_name}, подожди немного, пробую подписаться на событие <code>[${action}]</code>...`;
	this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });

	subscribers.getUser( action, chatId )
		.then(data => {
			if(!data){
				subscribers.subscribeToAction( action, chatId )
					.then(data => {
						let text = `${first_name}, ты успешно подписался на событие <code>[${action}]</code>`;
						this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });
					});
			}else{
				let text = `${first_name}, ты уже подписан на это событие <code>[${action}]</code>`;
				this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });
			}

			
		})
}

module.exports.unsubscribe = function( msg ) {
	const { action, chat: { id: chatId, first_name } } = msg;
	let text = `${first_name}, подожди немного, пробую отписаться от события <code>[${action}]</code>...`;
	this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });

	subscribers.getUser( action, chatId )
		.then(data => {
			if(!data){
				let text = `${first_name}, ты еще не подписан на это событие <code>[${action}]</code>`;
				this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });
			}else{
				subscribers.unsubscribeToAction( action, chatId )
					.then(data => {
						let text = `${first_name}, ты успешно отписался от события <code>[${action}]</code>`;
						this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });
					})
			}
		})
}