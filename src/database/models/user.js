module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
  });

  // User.associate = (models) => {
  //   User.hasMany(models.BlogPosts, {
  //     foreignKey: "id",
  //     as: "blogPosts"
  //   });
  // };

  return User;
};