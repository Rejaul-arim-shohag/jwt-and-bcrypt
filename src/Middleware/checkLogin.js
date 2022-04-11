const jwt = require('jsonwebtoken');
const checkLogin = (req, res, next)=>{
    const authorization = req.headers.authorization;
    try{
        const token = authorization.split(' ')[1];   
        const decoded = jwt.verify(token, "secret123");
        //if I need userName and Password,so that distructured here
        const {userName, userId} = decoded;
        req.userName = userName;
        req.userId = userId;
        next()
    }
    catch{
        next("Authentication failure")
    }
}
module.exports = checkLogin;