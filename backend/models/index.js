const User = require('./user');
const Match = require('./match');

User.hasMany(Match, {
  as: 'winns',
  foreignKey: 'winnerId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
User.hasMany(Match, {
  as: 'loses',
  foreignKey: 'loserId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
Match.belongsTo(User, {
  as: 'winner',
  foreignKey: 'winnerId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
Match.belongsTo(User, {
  as: 'loser',
  foreignKey: 'loserId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

module.exports = { User, Match };
