const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    const {token} = req.headers.authorization.split(' ')[1];
    if(!token){ 
        res.send("No token")
    }else{
        jwt.verify(token,process.env.SECRET_WORD,(err,user) => {
            if(err){
                console.log("JWT verification error", err)
            }else{
                next()
            }
        })
    }

}

module.exports = {auth}