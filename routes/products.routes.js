const express = require('express')

const {
  createProduct,
  getListProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/products.controllers')

const {
  productValidations,
  checkValidations
} = require('../middlewares/validations.middlewares')

const {
  protectToken
} = require('../middlewares/users.middlewares')

const {
  productExists,
  protectProductOwner
} = require('../middlewares/products.middlewares')

const router = express.Router()


router.use('/', protectToken)

router.post('/', productValidations, checkValidations, createProduct)
router.get('/', getListProducts)
router.get('/:id', productExists, getProductById)

router.patch('/:id', productExists, protectProductOwner, updateProduct)
router.delete('/:id', productExists, protectProductOwner, deleteProduct)

module.exports = { productRouter: router }

