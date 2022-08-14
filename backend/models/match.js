const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class Match extends Model {}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    game: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    winnerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    loserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: 'match',
  },
);

module.exports = Match;
