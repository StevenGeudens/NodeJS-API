const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
	{
		name: { type: String, required: true},
		location: { type: String },
		city: { type: String },
		state: { type: String },
		postalCode: { type: String },
	},
	{
		collection: 'store',
	}
);

module.exports = mongoose.model('Store', StoreSchema);
