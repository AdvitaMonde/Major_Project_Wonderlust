const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMpngoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
    },
    
});

userSchema.plugin(passportLocalMpngoose);
module.exports = mongoose.model('User',userSchema);