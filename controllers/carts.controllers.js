
require('dotenv').config()

const { Cart } = require('../models/cart.model')
const { ProductInCart } = require('../models/productInCart.model')

const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/appError')

const getCart = catchAsync(async (req, res, next) => {
  const { userSession } = req

  let cart = await Cart.findOne({
    where: { userId: userSession.id, status: 'active' }
  })

  res.status(200).json({
    cart
  })
})

const addProductCart = catchAsync(async (req, res, next) => {
  const { product, cart } = req
  const { quantity } = req.body

  let productCart = await ProductInCart.findOne({
    where: {
      productId: product.id,
      cartId: cart.id
    }
  })

  if (productCart && productCart.status === 'active') {
    return next(new AppError('Product already in cart', 404))
  }

  if (productCart &&  productCart.status === 'removed') {
    await productCart.update({
      status: 'active',
      quantity 
    })
  }

  if (!productCart) {
    productCart = await ProductInCart.create(
    {
      cartId: cart.id,
      productId: product.id,
      quantity
    })
  } 

  res.status(200).json({
    productCart
  })
})



const updateCart = catchAsync(async (req, res, next) => {
  //buscar cart del usuario
  const { userSession } = req

  let cart = await Cart.findOne({
    where: {
      userId: userSession.id,
      status: 'active'
    }
  })
  //info que traje de validar cantidades
  const { quantity } = req.body
  const { product } = req

  let productCart = await ProductInCart.findOne({
    where: {
      productId: product.id,
      cartId: cart.id
    }
  })

  if (productCart && quantity === 0) {
    await productCart.update({
      status: 'removed',
      quantity
    })
  }
  if (productCart && quantity > 0) {
    await productCart.update({
      status: 'active',
      quantity
    })
  }

  if (!productCart && quantity !== 0) {
    productCart = await ProductInCart.create(
    {
      cartId: cart.id,
      productId: product.id,
      quantity
    })
  }

  res.status(200).json({
    productCart
  })
})

const deleteProductCart = catchAsync(async (req, res, next) => {
  res.status(200).json({})
})

const purchaseCart = catchAsync(async (req, res, next) => {
  res.status(200).json({})
})

module.exports = {
  getCart,
  addProductCart,
  purchaseCart,
  updateCart,
  deleteProductCart
}