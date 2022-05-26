
// import Models
const { User } = require('./user.model')
const { Order } = require('./order.model')
const { Cart } = require('./cart.model')
const { ProductInCart } = require('./productInCart.model')

const initModels = () => {
  // 1 User <----> M Orders
  User.hasMany(Order)
  Order.belongsTo(User)

  // 1 order <----> 1 Cart
  Cart.hasOne(Order)
  Order.belongsTo(Cart)

  // 1 cart <----> M ProductInCart
  Cart.hasMany(ProductInCart)
  ProductInCart.belongsTo(Cart)
}

module.exports = { initModels }
