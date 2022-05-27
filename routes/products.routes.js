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
  checkValidations,
  updateProdValidations
} = require('../middlewares/validations.middlewares')

const {
  protectToken
} = require('../middlewares/users.middlewares')

const {
  productExists,
  protectProductOwner
} = require('../middlewares/products.middlewares')

const { upload } = require('../utils/multer');

const router = express.Router()

router.get('/', getListProducts)
router.get('/:id', productExists, getProductById)

router.use('/', protectToken)

router.post('/',
  upload.array('productImgs', 3),
  productValidations,
  checkValidations,
  createProduct)

router.patch('/:id',
  productExists,
  protectProductOwner,
  updateProdValidations,
  checkValidations,
  updateProduct)

router.delete('/:id', productExists, protectProductOwner, deleteProduct)

module.exports = { productRouter: router }

