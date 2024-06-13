const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 3000;

//Middleware - Plugin,   it takes the incoming data into js object and puts it into the body.
app.use(express.urlencoded({ extended: false}));//here we are activating plugin of  urlencoded. whenever urlencoded data i.e form data comes it will put it into body.
//this runs for every request

app.use((req, res, next)=>{
    console.log("hello from middleware 1");
    req.name = "shruti";
    console.log("headers: ", req.headers);
    fs.appendFile("./log.txt", `${Date.now()}: ${req.method}, ${req.path}, IP: ${req.ip}\n`, (err)=>{
        next();
    });
   
});

app.use((req, res, next)=>{
    console.log("hello from middleware 2");
    // res.send("Go Back");
    console.log(req.name);
    delete req.name;
    console.log(req.name);
    res.setHeader("X-MyHeader", "Shruti")
    next();

})

//routes
app.get('/users', (req, res)=>{
    // return
    const html = `
        <ul>
            ${users.map((user)=>{return `<li>${user.first_name}</li>`}).join("")}
        </ul>
    `;
    return res.send(html);
})
app.get('/api/users', (req, res)=>{
   return res.json(users);
})

app
.route('/api/users/:id')
.get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id===id);
    return res.send(user);
})
.patch((req, res)=>{
    //edit user with id
    const id = req.params.id;
    const newData = {
        id: id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        job_Title: req.body.job_Title,
        }
    
    for(let user of users){
        if(user.id===Number(newData.id)){
            Object.assign(user, newData);
        }
    }
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err)=>{return res.json({status: "pending"});})
    
})
.delete((req, res)=>{
    return res.json({status: "pending"});
})

app.post('/api/users', (req, res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_Title){
        return res.status(400).json({msg:"all fields are required"})
    }
    console.log(body);
    users.push({...body, id: users.length+1})    

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        // res.json({"Success:":" User created"})
        if(err){
             res.json({"Error":`error while creating user\n${err}`});
        }
        else{
              res.status(201).json({"Success:":` User created with id = ${users.length}`})
        }   
    })
    
})

app.listen(PORT, ()=>{
    console.log("server started..!!");
})

/*
-----------------------
server is hybrid server. which means it can send data/response to any type of client.
thus we should use routes like this-
        GET users/    -> for html document
        GET  api/users     ->for JSON data

    its a good practice to follow this.
-----------------------

dynamic path parameters

    GET  /api/users/:id
    :id -> variable i.e dynamic value
--------------------------


*/