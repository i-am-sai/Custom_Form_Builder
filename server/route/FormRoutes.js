const express = require("express");
const { FormModel } = require("../model/FormModel");

const FormRouter = express.Router()

// post request
FormRouter.post('/add', async (req, res) => {
    try {
        const form = new FormModel(req.body);
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        res.status(500).json({ error: 'Unable to create the form.' });
    }
});

// Get Request 
FormRouter.get('/', async (req, res) => {
    const formid = req.query.formId
    try {
        const form = await FormModel.findOne({ "formId": formid });
        if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
        }
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch forms.' });
    }
});

//   Get a single form by ID (GET):

FormRouter.get('/:id', async (req, res) => {
    try {
        const form = await FormModel.findOne({ "formId": req.params.id });
        if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
        }
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch the form.' });
    }
});

module.exports = { FormRouter }
