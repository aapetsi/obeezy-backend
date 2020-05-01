const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const generateToken = require('../../helper/generateToken')
const validateLoginInput = require('../../middleware/validateLoginInput')

const login = async (req, res) => {
  try {
    const user = req.body
    const { errors, isValid } = validateLoginInput(user)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const foundUser = await User.findOne({ email: user.email })

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
      const token = generateToken(user)
      return res.status(200).json({
        user: {
          id: foundUser._id,
          username: foundUser.username,
        },
        token,
      })
    } else {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = login
