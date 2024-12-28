// backend/models/Media.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Journal = require("./Journal"); // Import Journal model

// Define the Media model
const Media = sequelize.define(
	"Media",
	{
		Mid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Jid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Journal,
				key: "Jid",
			},
			onDelete: "CASCADE",
		},
		MediaURL: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				isUrl: true,
				notEmpty: true,
			},
		},
		MediaType: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		CreatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "Media",
		timestamps: false, // Disable automatic timestamps
	}
);

// Define Associations
Media.associate = (models) => {
	Media.belongsTo(models.Journal, {
		foreignKey: "Jid",
		as: "journal",
	});
};

// Export the model
module.exports = Media;
