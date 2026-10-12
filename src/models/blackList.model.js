const mongoose = require("mongoose");




const tokenBlacklistSchema = new mongoose.Schema({
    token:{
        type : String,
        required : [true , "Token is required to blacklist"],
        unique :[true , "Token is already blacklisted"]
    },
    blacklistedAt: {
        type : Date ,
        default : Date.now ,
        immutable : true ,
    }
},{
    timestamps : true
})



tokenBlacklistSchema.index({ blacklistedAt : 1 },{
    expireAfterSeconds : 60 * 60 * 24 * 3 //3days
})


const tokenBlackListModel = mongoose.model("tokenBlackList" , tokenBlacklistSchema);

module.exports = tokenBlackListModel ;













