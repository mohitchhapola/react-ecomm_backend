const mongoose = require("mongoose")
const {Schema} = mongoose;

// const addressSchema = mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pinCode: { type: String, required: true }
// })
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: Buffer, required: true },
    role: { type: String, required: true, default:'user' },
    addresses: { type: [Schema.Types.Mixed] }, 
    // TODO:  We can make a separate Schema for this
    orders: { type: [Schema.Types.Mixed] },
     // Embedding address schema as an array
     salt:Buffer
})

const virtual  = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON',{
  virtuals: true,
  versionKey: false,
  transform: function (doc,ret) { delete ret._id}
})

const User = mongoose.model("User",userSchema);
module.exports = User;