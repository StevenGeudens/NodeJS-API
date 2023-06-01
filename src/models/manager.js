const mongoose = require('mongoose');
const Store = require('./store');

const ManagerSchema = new mongoose.Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String },
		phone: { type: String },
		stores: [{ type: mongoose.Schema.Types.ObjectId, ref: Store }],
	},
	{
		collection: 'manager',
	}
);

module.exports = mongoose.model('Manager', ManagerSchema);
