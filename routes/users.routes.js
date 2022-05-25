const express = require('express')

const {
  signup,
  login,
  updateUser,
  deleteUser,
  getUserOrders,
  getOrderById,
  getAllUsers,
  getProductsUser
} = require('../controllers/users.controllers')

const {
  createUserValidations,
  checkValidations
} = require('../middlewares/validations.middlewares')

const {
  userExists,
  protectToken,
  protectAccountOwner
} = require('../middlewares/users.middlewares')

const router = express.Router()

router.post('/', createUserValidations, checkValidations, signup)
router.post('/login', login)

router.use('/', protectToken)

router.get('/', getAllUsers)
router.get('/me', getProductsUser)
router.patch('/:id', userExists, protectAccountOwner, updateUser)
router.delete('/:id', userExists, protectAccountOwner, deleteUser)
router.get('/orders', getUserOrders)
router.get('/orders/:id', getOrderById)

module.exports = { userRouter: router }
