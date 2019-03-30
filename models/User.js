const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    nic:{
        type:String,
        unique:true
    },
    contact_number:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    registered_date:{
        type:Date,
        default:Date.now
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    },
    status:{
        type:Boolean
    }
});

module.exports = User = mongoose.model('user',UserSchema);