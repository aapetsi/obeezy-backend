const bcrypt = require('bcryptjs')
const User = require('../../models/User')
// import generate token
// import input validation

const register = async (req, res) => {
  try {
    // validate body contents
    const user = req.body

    // Check if user already exists
    const foundUser = await User.findOne({ email: user.email })

    if (foundUser)
      return res.status(400).json({ message: 'User already exists' })

    if (foundUser && foundUser.username === user.username)
      return res.status(400).json({ message: 'Username already taken' })

    const newUser = new User(user)
    const hash = bcrypt.hashSync(user.password, 10)
    newUser.password = hash
    const savedUser = await newUser.save()
    // const token = generateToken(savedUser)
    res.send(newUser)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = register
