// backend/models/index.js

const User = require("./User");
const Journal = require("./Journal");
const Media = require("./Media");
// Import other models like Reflection and Template if they exist

// Initialize all models and define associations
const initModels = () => {
	// Define associations here if not defined in individual model files
	User.hasMany(Journal, {
		foreignKey: "Uid",
		as: "journals",
		onDelete: "CASCADE",
		hooks: true,
	});

	Journal.belongsTo(User, {
		foreignKey: "Uid",
		as: "user",
	});

	Journal.hasMany(Media, {
		foreignKey: "Jid",
		as: "media",
		onDelete: "CASCADE",
		hooks: true,
	});

	Media.belongsTo(Journal, {
		foreignKey: "Jid",
		as: "journal",
	});

	// Define associations for Reflection and Template models here if they exist
};

module.exports = {
	User,
	Journal,
	Media,
	initModels,
	// Export other models like Reflection and Template if they exist
};
