var buttons = require("../libs/buttons");

module.exports = function( msg ) {
	const { chat : { id : chatId } } = msg;
	const keyboard = buttons.getKeyBoard();
	const text = `
	<strong>Список команд</strong>
	<code>/help</code> - список всех команд
	<code>/hide_menu</code> - спрятать меню
	<code>/show_menu</code> - открыть меню
	<code>/new_manga</code> - получить список новых глав манги с readmanga.me
	<code>/random_manga</code> - получить случайную мангу
	<code>/sub_new_manga</code> - подписаться на рассылку новых поступлений
	<code>/sub_random_manga</code>- подписаться на рассылку случайной манги
	<code>/unsub_new_manga</code> - отписаться от рассылки новых поступлений
	<code>/unsub_random_manga</code> - отписаться  от рассылки случайной манги`;
	
	this.bot.sendMessage(chatId, text, Object.assign({ parse_mode: "HTML" }, keyboard));
}