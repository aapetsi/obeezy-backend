const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const generateToken = require('../../helper/generateToken')
const validateRegisterInput = require('../../middleware/validateRegisterInput')

const register = async (req, res) => {
  try {
    const user = req.body

    const { errors, isValid } = validateRegisterInput(user)

    if (!isValid) return res.status(400).json(errors)

    // Check if user already exists
    const foundUser = await User.findOne({ email: user.email })
    
    // Check for duplicate username
    const dupUsername = await User.findONe({username: user.username})

    if (foundUser)
      return res.status(400).json({ email: 'User already exists' })
    
    if (dupUsername) {
      return res.status(400).json({username: 'Username already taken'})
    }

    const newUser = new User(user)
    const hash = bcrypt.hashSync(user.password, 10)
    newUser.password = hash
    const savedUser = await newUser.save()
    const token = generateToken(savedUser)

    return res.status(201).json({
      user: {
        id: savedUser._id,
        username: savedUser.username,
      },
      token,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = register
