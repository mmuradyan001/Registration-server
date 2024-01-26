// const jwt = require('jsonwebtoken')

// const createToken = email => {
//   try {
//     const token = jwt.sign({email}, process.env.SECRET_WORD, {
//       expiresIn:'1d'
//     })
//     return token
//   } catch (error) {
//     console.log("Token creating error", error)
//     throw error
//   }
// }

// class LoginController {

//   async loginUser (req, res) {
//     const { email, password } = req.body
//     try {
//       const user = await req.app.services.login.loginUser(email, password)
//       const token = createToken(user.email)
//       res.json({token})
//       res.json({user})
//     } catch (error) {
//       res.status(500).json({ message: error.message})
//     }
//   }
// }

// module.exports = LoginController


const jwt = require('jsonwebtoken');

const createToken = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.SECRET_WORD, {
      expiresIn: '1d',
    });
    return token;
  } catch (error) {
    console.log('Token creating error', error);
    throw error;
  }
};

class LoginController {
  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await req.app.services.login.loginUser(email, password);
      const token = createToken(user.email);

      const responseData = {
        token,
        user,
      };

      res.json(responseData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = LoginController;