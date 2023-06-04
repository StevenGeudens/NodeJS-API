const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		firstname: { type: String },
		lastname: { type: String },
		email: { type: String },
		password: { type: String },
		permissionlevel: [{ type: String }],
	},
	{
		collection: 'user',
	}
);

module.exports = mongoose.model('User', UserSchema);
