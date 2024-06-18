const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    return res.send(user);
}

const addNewUser = async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_Title) {
        return res.status(400).json({ msg: "all fields are required" })
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_Title: body.job_Title,
    })
    res.status(201).json({ "msg:": ` success` })
}

const updateUserById = async (req, res) => {
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

    const newUser = await User.findByIdAndUpdate(id, { first_name: req.body.first_name })
    return res.status(200).json({ msg: "user Updated" });
}

const deleteUserById = (req, res) => {
    return res.json({ status: "pending" });
}


module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUserById,
    deleteUserById,
}