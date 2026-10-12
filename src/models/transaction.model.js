const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({

    fromAccount :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Account",
        required : [true , "Transaction must be associated with a from account"] ,
        index : true 
    },
    toAccount :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Account",
        required : [true , "Transaction must be associated with a to account"] ,
        index : true 
    },
    status:{
        type: String,
        enum : {
            values :[ "Pending" , "Completed" ,"Failed","Reversed"],
            message : " status can be either Pending , completed , Failed , Reversed",
        },
        default : "Pending"
    },
    amount :{
        type : Number ,
        required : [true ,"Amount is required for creating a transaction "],
        min :[0 ,"Transaction amount cannot be neagtive"]
    },
    idempotencyKey : { 
        type : String,
        required : [true , "Idempontency Key is Required for Cereating a transaction"],
        index : true,
        unique : true
    }
},{
    timestamps :true
})


const transactionModel = mongoose.model("transaction" , transactionSchema)

module.exports = transactionModel