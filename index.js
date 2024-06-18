const express = require("express");
const userRoute = require("./routes/user.routes")
const { connectMongoDb } = require("./connection")
const { logReqRes } = require("./Middlewares");

const app = express();
const PORT = 3000;

//Connection
connectMongoDb().then(() => { console.log("Mongodb Connected.!!") });

//Middleware - Plugin,  it takes the incoming data into js object and puts it into the body.
app.use(express.urlencoded({ extended: false }));//here we are activating plugin of  urlencoded. whenever urlencoded data i.e form data comes it will put it into body.
//this runs for every request

app.use(logReqRes());

app.use("/api/user", userRoute);

app.listen(PORT, () => {
    console.log("server started..!!");
})

