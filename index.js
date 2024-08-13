require("dotenv").config();
const express = require("express");
const { db } = require("./DB/db");
const userRoute = require("./Route/Login-route");
const EmployeeRoute = require("./Route/Employee-route");
const PORT = process.env.PORT || 8000;
const app = express(); 

db();
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", EmployeeRoute);

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})