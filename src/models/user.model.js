const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, " enter ur email is required"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"],
        unique: [true, "email id already exits"]
    },
    name :  {
        type : String,
        required: [true , " enter ur name is required"],
    },
    password : {
        type : String,
        required : [true , "passs is must "],
        minlength : [ 6, " the password must me within 6 characters"],
        select : false
    },
    systemUser:{
        type : Boolean ,
        default : false,
        immutable : true ,
        select : false 
    }
},{
    timestamps : true
})


userSchema.pre( "save" , async function(){

    if(!this.isModified("password")){
        return 
    }

    const hash = await bcrypt.hash(this.password , 10)
    this.password = hash 

    return 
})

userSchema.methods.comparePassword = async function (password){

    return await bcrypt.compare(password , this.password)

}


const userModel = mongoose.model("user" , userSchema)

module.exports = userModel