const fs = require("fs");

function logReqRes(){

    return (req, res, next) => {
        console.log("hello from middleware");
        // res.send("Go Back");
        // delete req.name;
        // console.log(req.name);
        res.setHeader("X-MyHeader", "Shruti")
        fs.appendFile("./log.txt",`${new Date()} => ${req.path}`, (err)=>{
            console.log("Error: ", err);
        })
        next();
    }
}

module.exports = {
    logReqRes
}