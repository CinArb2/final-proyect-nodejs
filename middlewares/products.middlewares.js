require('dotenv').config()

const { Product } = require('../models/product.model')

const { AppError } = require('../utils/appError')
const { catchAsync } = require('../utils/catchAsync')

const productExists = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const product = await Product.findOne({
    where: { id, status: 'active' }
  })

  if (!product) {
    return next(new AppError('Product doesn\'t exist with given Id', 404))
  }

  req.product = product
  next()
})

const protectProductOwner = catchAsync(async (req, res, next) => {
  const { userSession, product } = req

  if (userSession.id !== product.userId) {
    return next(new AppError('you are not authorized', 403))
  }

  next()
})

module.exports = {
  productExists,
  protectProductOwner
}