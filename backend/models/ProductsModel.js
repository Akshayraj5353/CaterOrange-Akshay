const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema(
    {
     title:{type:String,required:true},
     images:[{type:String}],
     price:{type:Number,required:true},
     description:{type:String,required:true},
     category:{type:mongoose.Schema.Types.ObjectId,ref:'Categories',required:true},
     tag :[{type:String}],
     salesOffer:{
        status:{type:Boolean,default:false,required:true},
        discount:{type:Number, default:0, required:true},
     },
     stock: {type: Number, required: true, default: 0},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Products',ProductsSchema);