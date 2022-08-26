module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  },
  {
    timestamps: false,
    tableName: 'PostCategories',
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'blogPost',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};