const express = require('express');
const userDB = require('./models/userDB');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Display all users
app.get("/", function (req, res) {
    userDB.getUsers(function (data) {
        console.log(data);
        res.render("manageUsers", { users: data });
    });
});

// Display the Add User page
app.get("/users/new", function (req, res) {
    res.render("addUser");
});

// Add a new user
app.post("/users", function (req, res) {
    userDB.addUser(req.body, function (data) {
        console.log(data);
        res.redirect("/");
    });
});

// Delete a user
app.post("/users/:id/delete", function (req, res) {
    const userID = req.params.id;

    userDB.deleteUser(userID, function (data) {
        console.log(data);
        res.redirect("/");
    });
});

app.listen(PORT, function () {
    console.log(`Listening on Port: ${PORT}`);
});