const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'dealer'],
        default: 'user'
    }
},{
    timestamps : true, // to add created_at and updated_at fields in the schema
    versionKey: false
});

const UserModel = mongoose.model("users",userSchema);

module.exports = {UserModel};