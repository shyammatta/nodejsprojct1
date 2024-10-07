// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  s_no: {type: Number, required: true, unique: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords
});



const Login =mongoose.model('User', userSchema);
module.exports = Login;
