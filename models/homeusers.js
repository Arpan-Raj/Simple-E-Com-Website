const mongooose = require('mongoose');
const productSchema = new mongooose.Schema({
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
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    // created:{
    //     type: Date,
    //     required: true,
    //     default: Date.now,
    // },
});

module.exports = mongooose.model("homeproduct", productSchema);