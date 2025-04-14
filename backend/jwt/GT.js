const jwt = require('jsonwebtoken');

const gt=(id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"50d"})
}
module.exports=gt