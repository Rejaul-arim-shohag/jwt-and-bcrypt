const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: { type: 'string', required: true },
    userName: { type: 'string', required: true },
    password: { type: 'string', required: true },
    status: { type: 'string', enum:["active", "inactive"]}
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;