const express = require('express')

const {
  getCart,
  addProductCart,
  purchaseCart,
  updateCart,
  deleteProductCart
} = require('../controllers/carts.controllers')

const {
  cartValidations,
  checkValidations
} = require('../middlewares/validations.middlewares')

const {
  protectToken,
  protectAccountOwner
} = require('../middlewares/users.middlewares')

const {
  cartActive,
  validateQuantity
} = require('../middlewares/carts.middlewares')

const router = express.Router()


router.use('/', protectToken)

router.get('/', getCart)

router.post('/add-product',
  cartValidations,
  checkValidations,
  cartActive,
  validateQuantity,
  addProductCart)


router.patch('/update-cart', validateQuantity, updateCart)
// router.delete('/:cartId/:productId', cartExist, protectAccountOwner, deleteProductCart)
// router.post('/:cartId/purchase', cartExist, protectAccountOwner, purchaseCart)

module.exports = { cartRouter: router }