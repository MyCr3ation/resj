// backend/models/Journal.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User"); // Import User model

// Define the Journal model
const Journal = sequelize.define(
	"Journal",
	{
		Jid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Uid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "Uid",
			},
			onDelete: "CASCADE",
		},
		Rid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			// Assuming Reflections table exists; adjust as needed
		},
		Tid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			// Assuming Templates table exists; adjust as needed
		},
		EntryDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: true,
				notEmpty: true,
			},
		},
		Weather: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		Emotions: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		Data: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		Goal: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		Affirmation: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		R_Answer: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		QuoteText: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		QuoteAuthor: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
		CreatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		UpdatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "Journals",
		timestamps: false, // Disable automatic timestamps
	}
);

// Define Associations
Journal.associate = (models) => {
	Journal.belongsTo(models.User, {
		foreignKey: "Uid",
		as: "user",
	});

	Journal.hasMany(models.Media, {
		foreignKey: "Jid",
		as: "media",
		onDelete: "CASCADE",
		hooks: true,
	});

	// If Reflections and Templates models exist, define associations here
	// Example:
	// Journal.belongsTo(models.Reflection, { foreignKey: 'Rid', as: 'reflection' });
	// Journal.belongsTo(models.Template, { foreignKey: 'Tid', as: 'template' });
};

// Export the model
module.exports = Journal;
