module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Etudes', {
		libelle: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
	})
};