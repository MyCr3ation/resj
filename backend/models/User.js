// backend/models/User.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the User model
const User = sequelize.define(
	"User",
	{
		Uid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		Name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
		},
		Password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
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
		tableName: "Users",
		timestamps: false, // Disable automatic timestamps (since we have CreatedAt and UpdatedAt)
	}
);

// Define Associations
User.associate = (models) => {
	User.hasMany(models.Journal, {
		foreignKey: "Uid",
		as: "journals",
		onDelete: "CASCADE",
		hooks: true,
	});
};

// Export the model
module.exports = User;
