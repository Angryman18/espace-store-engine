import express from "express";

const app = express();


app.get('/', (req, res) => {
    res.status(200).json({message: "Server is running."})
})

app.listen(5000, () => console.log("Server Running at 5000"));
