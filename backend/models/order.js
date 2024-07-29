const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    email:{
     type:String
    },
    Email :{
        type : String,
        required: true
    },
    products: [{
        productId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: { 
            type: Number, 
            default: 1 
        } 
    }],
    amount: { 
        type: Number,
        required: true
    },

    address: {
        type: String,
        required:true
      },
      paymentMethod:{
        type:String
      }
      
});

module.exports = mongoose.model('Order', orderSchema)
