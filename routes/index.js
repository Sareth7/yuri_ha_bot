const actions = require("../actions");
const ripper = require("./ripper");

module.exports = function( msg ) {
	switch( msg.text ) {
		case "/start":
			actions.start.call(this, msg);
			actions.help.call(this, msg);
		break;
		case "/help": case "\u{2753}Помощь":
			actions.help.call(this, msg);
		break;
		case "\u{2B05}Назад":
			actions.switchKeyboard.call(this, msg)
		break;
		case "/photo":
			actions.sendPhoto.call(this, msg);
		break;
		case "/new_manga": case "\u{1F195} Новая манга":
			actions.scrap.newManga.call(this, msg);
		break;
		case "/random_manga": case "\u{1F365}Случайная манга":
			actions.scrap.randomManga.call(this, msg);
		break;
		case "\u{1F234}Подписаться":
			actions.switchKeyboard.call(this, msg, "sub")
		break;
		case "\u{1F515}Отписаться":
			actions.switchKeyboard.call(this, msg, "unsub")
		break;
		case "/sub_new_manga": case "\u{1F004}Подписаться на рассылку новых глав":
			actions.subscribeActions.subscribe.call(this, Object.assign({}, msg, { action: "newManga" }))
		break;
		case "/sub_random_manga": case "\u{1F300}Подписаться на рассылку случайной манги":
			actions.subscribeActions.subscribe.call(this, Object.assign({}, msg, { action: "randomManga" }))
		break;
		case "/unsub_new_manga": case "\u{1F640}Отписаться от рассылки новых глав":
			actions.subscribeActions.unsubscribe.call(this, Object.assign({}, msg, { action: "newManga" }))
		break;
		case "/unsub_random_manga": case "\u{1F198}Отписаться от рассылки случайной манги":
			actions.subscribeActions.unsubscribe.call(this, Object.assign({}, msg, { action: "randomManga" }))
		break;
		case "/hide_menu":
			actions.switchKeyboard.call(this, msg, "close");
		break;
		case "/show_menu":
			actions.switchKeyboard.call(this, msg, "main");
		break;
		default:
			const link = ripper.isLink(msg.text)
			if(link){
				actions.subscribeActions.subscribe.call(this, Object.assign({}, msg, { action: link }))
			}else{
				actions.default.call(this, msg);
			}	
		break;
	}
}