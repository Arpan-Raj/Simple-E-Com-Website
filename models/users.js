const mongooose = require('mongoose');
const userSchema = new mongooose.Schema({
    name:{
        type: 'String',
        required: true,
    },
    price:{
        type: 'Number',
        required: true,
    },
    qty:{
        type: 'Number',
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

module.exports = mongooose.model("Product", userSchema);