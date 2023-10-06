const mongoose = require('mongoose');
const validator = require('validator');

const requestSchema = new mongoose.Schema({
     
    //foriegn key
    /*CusId:{
        type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "customers",
    },*/
    /*AdminId:{
        type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "admins",
    },*/
    itemname:{
        type: String,
         required: [true, "Item name is required"],
     },
     brand:{
          type: String,
         required: [true, "Brand is required"]
     },
     model:{
          type: String,
          required: [true, "Model is required"]
     },    
       
    version:{
         type: String,
         required: [true, "Version is required"],
    },
    userID:{
     type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customers",
    },
    userName: {
     type: String,
     required: [true, "User name is required"]
   },
   
   profileImage: {
     type: String,
   },
   
   userEmail : {
     type: String,
     required: true,
     trim: true,
     validate(value){
       if(!validator.isEmail(value)) {
         throw new Error('Please enter valid email address')
       }
     }  
   },

});
const Requests = mongoose.model('requests', requestSchema)

module.exports = Requests;



