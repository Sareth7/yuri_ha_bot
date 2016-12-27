const Subscribe = require("../models/Subscribe");

module.exports.getUser = function( action, user ) {
	let promise = Subscribe
		.findOne({ 
			action,
			users: { $in : [ user ] } 
		})
		.limit(1)

	return promise;
}

module.exports.getSubscribe = function( action ) {
	let promise = Subscribe
		.findOne({ action })
		.limit(1)

	return promise;
}

module.exports.subscribeToAction = function( action, user ) {
	let promise = Subscribe
		.update(
			{ action },
			{ $push: { users: user } },
			{ safe: true, upsert: true, new: false }
		)

	return promise;
}

module.exports.unsubscribeToAction = function( action, user ) {
	let promise = Subscribe
		.update(
			{ action },
			{ $pull: { users: user } }
		)

	return promise;
}