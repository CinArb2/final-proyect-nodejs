
// import Models
// const { User } = require('./user.model')
// const { Order } = require('./order.model')
// const { Restaurant } = require('./restaurant.model')
// const { Review } = require('./review.model')
// const { Meal } = require('./meal.model')

const initModels = () => {
  // 1 User <----> M Order
  // User.hasMany(Order)
  // Order.belongsTo(User)

  // // 1 Restaurant <----> M Reviews
  // Restaurant.hasMany(Review)
  // Review.belongsTo(Restaurant)

  // // 1 Restaurant <----> M meals
  // Restaurant.hasMany(Meal)
  // Meal.belongsTo(Restaurant)

  // // 1 order <----> 1 Meal
  // Meal.hasOne(Order)
  // Order.belongsTo(Meal)
}

module.exports = { initModels }
