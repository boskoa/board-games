const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class EnglishWord extends Model {}

EnglishWord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: 'englishWord',
  },
);

module.exports = EnglishWord;
