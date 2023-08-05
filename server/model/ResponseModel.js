const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    formId: { type: String, required: true },
    response: { type: Array, required: true }
},
    {
        versionKey: false
    }
);

const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = { ResponseModel }
