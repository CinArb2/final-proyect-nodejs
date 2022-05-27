
// import Models
const { User } = require('./user.model')
const { Order } = require('./order.model')
const { Cart } = require('./cart.model')
const { Category } = require('./category.model')
const { Product } = require('./product.model')
const { ProductImg } = require('./productImg.model')
const { ProductInCart } = require('./productInCart.model')

const initModels = () => {
  // 1 User <----> M Orders
  User.hasMany(Order)
  Order.belongsTo(User)

  // 1 User <----> M Products
  User.hasMany(Product)
  Product.belongsTo(User)

  // 1 User <----> 1 Cart
  User.hasOne(Cart)
  Cart.belongsTo(User)

  // 1 order <----> 1 Cart
  Cart.hasOne(Order)
  Order.belongsTo(Cart)

  // 1 cart <----> M ProductInCart
  Cart.hasMany(ProductInCart)
  ProductInCart.belongsTo(Cart)

   // 1 Product <----> 1 Category
  Category.hasOne(Product)
  Product.belongsTo(Category)

   // 1 Product <----> M ProductImg
  Product.hasMany(ProductImg)
  ProductImg.belongsTo(Product)

  // 1 Product <----> 1 ProductInCart
  Product.hasOne(ProductInCart)
  ProductInCart.belongsTo(Product)
}

module.exports = { initModels }
