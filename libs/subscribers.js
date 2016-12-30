const Subscribe = require("../models/Subscribe");

module.exports.checkUserSub = function( action, user, isSub = false ) {
	let promise = new Promise((resolve, reject) => {
		Subscribe
			.findOne({ action, users: { $in : [ user ] } })
			.limit(1)
			.then(data => {
				if((!data && !isSub) || (data && isSub)) {
					resolve(data)
				}else {
					reject(data)
				}
			})
	})

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