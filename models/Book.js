const mongoose = require('mongoose')
const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
})

const Book = mongoose.model('book', BookSchema)

module.exports = Book
