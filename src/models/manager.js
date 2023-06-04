const mongoose = require('mongoose');
const Store = require('./store');

const ManagerSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String },
		stores: [
			{ type: mongoose.Schema.Types.ObjectId, ref: Store, required: true },
		],
	},
	{
		collection: 'manager',
	}
);

module.exports = mongoose.model('Manager', ManagerSchema);
