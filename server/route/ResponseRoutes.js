const express = require("express");
const { ResponseModel } = require("../model/ResponseModel")

const ResponseRouter = express.Router()

// post request
ResponseRouter.post('/add', async (req, res) => {
    console.log(req.body);
    try {
        const response = new ResponseModel(req.body);
        await response.save();
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ error: 'Unable to create the form.' });
    }
});

module.exports = { ResponseRouter }
