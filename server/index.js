const express = require("express");
const cors = require('cors');
const { connection } = require("./config/db");
const { FormRouter } = require("./route/FormRoutes");
const { ResponseRouter } = require("./route/ResponseRoutes");
const app = express()
const { FormModel } = require('./model/FormModel');
const { ResponseModel } = require('./model/ResponseModel');

app.use(cors());
app.use(express.json());
app.use("/forms", FormRouter)
app.use("/response", ResponseRouter)

const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
    res.send("Welcome to custom form builder")
})

app.post("/create", (req, res) => {
    const { header, formId, questions } = req.body;
    const sendData = new FormModel({
        header: header,
        formId: formId,
        questions: questions
    })
    const saveResponse = sendData.save();
    res.status(200).json({
        sucess: true
    })
})

app.post("/create", (req, res) => {
    const { name, email, formId, response } = req.body;
    const sendData = new ResponseModel({
        name: name,
        email: email,
        formId: formId,
        response: response
    })
    const saveResponse = sendData.save();
    res.status(200).json({
        sucess: true
    })
})

app.get("/preview/:formId", async (req, res) => {
    try {
        const { formId } = req.params;
        const formData = await FormModel.findOne({ formId: formId });

        if (!formData) {
            return res.status(404).json({ error: "Form not found" });
        }

        // Send the form data to the frontend and render the 'preview' page
        res.sendFile(path.join(__dirname, 'path-to-your-frontend', 'build', 'index.html'));
    } catch (err) {
        console.error("Error fetching form data:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, async () => {
    try {
        await connection
        console.log("DB is connected!!")
    } catch (error) {
        console.log(error)
    }
    console.log("app is running at the port 8080")
})

