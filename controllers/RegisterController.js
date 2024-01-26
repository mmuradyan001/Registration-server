class RegisterController {
    
  
    async registerUser (req, res) {
      try {
        await req.app.services.register.registerUser(req.body)
        res.json('users saved')
      } catch (error) {
        res.status(500).json({ messsage: error.messsage})
      }
    }
  }
  
  module.exports = RegisterController