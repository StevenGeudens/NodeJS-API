const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
	{
		name: { type: String },
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
