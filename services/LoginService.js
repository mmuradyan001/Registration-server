class LoginService {
    constructor (models) {
      this.models = models
    }
  
    async loginUser (email,password) {

      const user = this.models.users.login(email, password)
      if (user) {
        return user
      }
      throw new Error("user not found")
    }
  }
    
  module.exports = LoginService

 

