//import jwt
const jwt = require('jsonwebtoken')


const jwtMiddleWare = (req,res,next)=>{
    console.log('inside jwt Middleware');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token,process.env.JWT_SECRET)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()

    }catch (err) {
        res.status(401).json('authorization failed.....please Login')
    }


}

module.exports = jwtMiddleWare