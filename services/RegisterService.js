class RegisterService {
    constructor (models) {
      this.models = models
    }
  
    

    async registerUser (body) {
      try {
        const newUser = {
          name: body.name,
          lastname: body.lastName
        }
        const user = new this.models.users({ 
          ...body,
          ...newUser
        })
        await user.save()
        return user
      }
      catch(err) {
        console.log(err)
      }
      }
      
  }

  


  module.exports = RegisterService