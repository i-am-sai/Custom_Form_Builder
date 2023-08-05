const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    header: {
        description: { type: String, required: true },
        heading: { type: String, required: true }
    },
    formId: { type: String, required: true },

    questions: { type: Array, required: true }
},
    {
        versionKey: false
    }
);

const FormModel = mongoose.model('Form', formSchema);

module.exports = { FormModel }
