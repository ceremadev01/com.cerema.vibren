module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Etudes_listes', {
		etudeId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		acquisitionId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
	})
};