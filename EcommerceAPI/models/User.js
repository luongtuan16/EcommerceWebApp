const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String, default: 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'}
},
    { timestamps: true });

module.exports = mongoose.model('User', userSchema);