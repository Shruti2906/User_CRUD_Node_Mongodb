const express = require("express");
const Router = express.Router();
const { getAllUsers, getUserById, addNewUser, updateUserById, deleteUserById } = require("../controllers/user.controller")

// -----------------------
// server is hybrid server. which means it can send data/response to any type of client.
// thus we should use routes like this-
//         GET users/    -> for html document
//         GET  api/users     ->for JSON data

//     its a good practice to follow this.
// -----------------------

// Router.get('/users', async (req, res) => {
//     const allDbUsers = await User.find({});
//     // return
//     const html = `
//         <ul>
//             ${allDbUsers.map((user) => { return `<li>${user.first_name}</li>` }).join("")}
//         </ul>
//     `;
//     return res.send(html);
// })

Router.route('/')
.get(getAllUsers)
.post(addNewUser);

// dynamic path parameters
//     GET  /api/users/:id
//     :id -> variable i.e dynamic value
// --------------------------
Router.get('/:id', getUserById)

Router.patch('/:id', updateUserById)

Router.delete('/:id', deleteUserById)

module.exports = Router;