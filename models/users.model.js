const { model, Schema } = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require('bcrypt')

const Users = Schema({
  email: {
    type: String,
    unique: true,
    required: [ true, 'email field is required' ],
    validate: [ isEmail, 'invalid email' ],
    lowercase: true
  },
  gender: {
    type: String,
    enum: [ 'male', 'female']
  },
  password: {
    type: String,
    required: [ true, 'password field is required' ],
    minLength: [ 8, 'password must by min 8 characters' ],
    validate: (value) => {
      if (/^[A-Z]/.test(value)) {
        return true
      }
      throw new Error('must by start with uppercase')
    }
  }, 
  lastName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  skills: {
    type: [ String ],
    default: []
  }, isDeleted: {
    type: Boolean,
    default: false
  }
})

Users.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  console.log('this', this)
  next()
})

Users.post('save', function (doc, next) {
  console.log('doc', doc)
  console.log('User saved!')
  next()
})

Users.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (isValidPassword) {
      return user
    }
    throw new Error('incorect password')
  } else {
    throw new Error("user with this email wasn't found")
  }
}

module.exports = model('user', Users)