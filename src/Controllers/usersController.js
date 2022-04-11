const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../Models/usersModel");

exports.readData = (req, res)=>{
    userModel.find({}, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail","data":err})
        }
        else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

//create user
exports.userInsert = async (req, res) => {
    // const bodydata = req.body;
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = {
        name: req.body.name,
        userName: req.body.userName,
        password: hashPassword
    }
    userModel.create(newUser, (err, data) => {
        if (err) {
            res.status(500).json({ status: "fail", data: err })
        }
        else {
            res.status(200).json({ status: "signup is successfully", data: data })
        }
    })
};
//asynchronous operation for login user
exports.loginUser = async (req, res) => {
    try{
    const user = await userModel.find({ userName: req.body.userName});
    if (user && user.length > 0) {
        const isvalidPassword =await bcrypt.compare(req.body.password, user[0].password);
        console.log(isvalidPassword)
        if (isvalidPassword) {
            const token = jwt.sign({
                userName: user[0].userName,
                userId: user[0]._id,
            }, "secret123",{expiresIn:"1h" });
            res.status(200).json({"status":"login successfully","access_token":token})
        }
        else {
            res.status(401).json({ status: "fail", data: "authentication fail" })
        }
    }
    else {
        res.status(401).json({ status: "fail", data: "user Unauthenticated" })
    }
}
catch{
    res.status(401).json({ status: "fail", data: "authentication fail" })
}
}

// exports.loginUser = (req, res)=>{
//     const query = req.body;
//     const projection = {name:1, userName:1, password:1, _id:0}
//     userModel.find(query, projection,(err, data)=>{
//         if(err){
//             res.status(500).json({status:"fail", data:err})
//         }
//         else if(data==[]){
//             res.status(400).json({status:"fail", data:"data cannot find"})
//         }
//         else{
//             res.status(200).json({status:"success", data:data})
//         }
//     })
// }
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Implc21pbkJlZ3VtNTYiLCJ1c2VySWQiOiI2MjUzZmViYzk1NGFlMTgxM2UxMmY5ZWUiLCJpYXQiOjE2NDk2NzIwNzAsImV4cCI6MTY0OTY3NTY3MH0.yTCIfMhl5bcCojpA5pk6aIujCwEJkk_BOFWl8T9IyEM