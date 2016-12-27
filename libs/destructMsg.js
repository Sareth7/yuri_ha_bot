module.exports.getChatId = function( msg ) {
	const { chat : { id } } = msg;
	return id;
}

module.exports.getFirstName = function( msg ) {
	const { chat : { first_name } } = msg;
	return first_name;
}