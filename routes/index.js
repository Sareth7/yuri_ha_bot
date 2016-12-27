const actions = require("../actions");

module.exports = function( msg ) {
	switch( msg.text ) {
		case "/start":
			actions.start.call(this, msg);
		break;
		case "/help":
			actions.help.call(this, msg);
		break;
		case "/photo":
			actions.sendPhoto.call(this, msg);
		break;
		case "/new_manga": case "Новая манга":
			actions.scrap.newManga.call(this, msg);
		break;
		case "/random_manga": case "Случайная манга":
			actions.scrap.randomManga.call(this, msg);
		break;
		case "/sub_new_manga": case "Подписка на новую мангу":
			actions.subscribeActions.subscribe.call(this, Object.assign({}, msg, { action: "newManga" }))
		break;
		case "/sub_random_manga": case "Подписка на случайную мангу":
			actions.subscribeActions.subscribe.call(this, Object.assign({}, msg, { action: "randomManga" }))
		break;
		case "/unsub_new_manga": case "Отписаться от рассылки н.м":
			actions.subscribeActions.unsubscribe.call(this, Object.assign({}, msg, { action: "newManga" }))
		break;
		case "/unsub_random_manga": case "Отписаться от рассылки сл.м":
			actions.subscribeActions.unsubscribe.call(this, Object.assign({}, msg, { action: "randomManga" }))
		break;
		default:
			actions.default.call(this, msg);
		break;
	}
}