import mongoose from 'mongoose';

const academySchema =  mongoose.Schema({
    studentname: String,
    fathername: String,
    email: String,
    age: Number,
    contact: String,
    address: String,
    myacademy: String
    
})


export default new mongoose.model("Academy", academySchema)