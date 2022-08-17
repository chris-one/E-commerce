// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const seedTags = require('../seeds/tag-seeds');

// Products belongsTo Category
Product.hasOne(Category, {
foreignKey: "Category_id"
});
// Categories have many Products
Category.hasMany(product,{
  foreignKey: "Category_id",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(ProductTag, {
  foreignKey: "Tag_id",
})
// Tags belongToMany Products (through ProductTag)
seedTags.belongsToMany.Product(ProductTag,{
  foreignKey: "Tag_id",
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
