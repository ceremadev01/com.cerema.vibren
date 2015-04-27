module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Mesures', {
		voie: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		points: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		acquisitionId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		signalId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
	})
};