const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscribeSchema = new Schema({
	action: { type: String, unique: true },
	users: [{ type: Number, unique: true }]
})

module.exports = mongoose.model("Subscribe", SubscribeSchema);