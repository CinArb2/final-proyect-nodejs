require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user.model')
const { Order } = require('../models/order.model')

const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/appError')

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  })
  res.status(200).json({
    users
  })
})

const signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body

  const salt = await bcrypt.genSalt(12)
  const hashPwd = await bcrypt.hash(password, salt)

  const newUser = await User.create(
    {
      username,
      email,
      password: hashPwd
    })

  newUser.password = undefined

  res.status(201).json({ newUser })
})

const getProductsUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const salt = await bcrypt.genSalt(12)
  const hashPwd = await bcrypt.hash(password, salt)

  const newUser = await User.create(
    {
      name,
      email,
      password: hashPwd,
      role
    })

  newUser.password = undefined

  res.status(201).json({ newUser })
})

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: { email, status: 'active' }
  })

  if (!user) {
    return next(new AppError('invalid credentials', 400))
  }

  const decode = await bcrypt.compare(password, user.password)

  if (!decode) {
    return next(new AppError('invalid credentials', 400))
  }

  const token = await jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  user.password = undefined

  res.status(200).json({ token, user })
})

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req

  const { username, email } = req.body

  await user.update({ username, email })

  res.status(200).json({ status: 'success' })
})

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: 'deleted' })

  res.status(200).json({ status: 'success' })
})

const getUserOrders = catchAsync(async (req, res, next) => {
  const { userSession } = req

  const userOrders = await Order.findAll({
    where: { userId: userSession.id },
    // include: {
    //   model: Meal,
    //   include: { model: Restaurant }
    // }
  })

  res.status(200).json({ userOrders })
})

const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { userSession } = req

  const individualUserOrder = await Order.findOne({
    where: { userId: userSession.id, id },
    // include: {
    //   model: Meal,
    //   include: { model: Restaurant }
    // }
  })

  if (!individualUserOrder) {
    return next(new AppError('order with provided id does not exist', 404))
  }

  res.status(200).json({ individualUserOrder })
})



module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
  getUserOrders,
  getOrderById,
  getAllUsers,
  getProductsUser
}
