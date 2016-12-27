module.exports = function( msg ) {
	const { chat : { id : chatId } } = msg;
	const text = `<strong>Список команд</strong>
	<code>/help</code> - список всех команд
	<code>/new_manga</code> - получить список новых глав манги с readmanga.me
	<code>/random_manga</code> - получить случайную мангу
	<code>/sub_new_manga</code> - подписаться на рассылку новых поступлений
	<code>/sub_random_manga</code>- подписаться на рассылку случайной манги
	<code>/unsub_new_manga</code> - отписаться от рассылки новых поступлений
	<code>/unsub_random_manga</code> - отписаться  от рассылки случайной манги`;
	
	this.bot.sendMessage(chatId, text, { parse_mode: "HTML" });
}