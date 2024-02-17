const mongooose = require('mongoose');
const userSchema = new mongooose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    created:{
        type: Date,
        required: true,
        default: Date.now,
    },
});
module.exports = mongooose.model("User", userSchema);