const actions = require("../actions");
const ripper = require("./ripper");

module.exports = function(callback_data) {
	const { data:response , message } = callback_data;
	const [action, payload] = response.split(";");

	switch(action){
		case "sub":
			const link = ripper.isLink(payload);
			if(link) {
				actions.subscribeActions.subscribe.call(this, Object.assign(message, { action: link }))
			}
		break;
		case "unsub":
			 actions.subscribeActions.unsubscribe.call(this, Object.assign(message, { action: payload }))
		break;
		default:
		break;
	}

	
	
}