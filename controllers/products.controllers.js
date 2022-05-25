
require('dotenv').config()

const { Product } = require('../models/product.model')

const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/appError')

const createProduct = catchAsync(async (req, res, next) => {
  const {userSession} = req
  const { title, description, quantity, price } = req.body
  
  const newProduct = await Product.create({
    title,
    description,
    quantity,
    price,
    userId: userSession.id
  })

  res.status(200).json({
    newProduct
  })
})

const getListProducts = catchAsync(async (req, res, next) => {
  const productList = await Product.findAll({
    where: { status: 'active'  }
  })

  if (!productList) {
    return next(new AppError('not products available', 404))
  }
  res.status(200).json({
    productList
  })
})

const getProductById = catchAsync(async (req, res, next) => {
  const { product } = req
  
  res.status(200).json({
    product
  })
})

const updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req
  const { title, description, quantity, price } = req.body

  await product.update({ title, description, quantity, price  })

  res.status(200).json({ status: 'success' })
})

const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req

  await product.update({ status: 'deleted' })

  res.status(200).json({ status: 'success' })
})

module.exports = {
  createProduct,
  getListProducts,
  getProductById,
  updateProduct,
  deleteProduct
}