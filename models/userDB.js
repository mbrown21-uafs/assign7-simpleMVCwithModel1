const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'assignDBuser',
    password: 'assignDBpass',
    database: 'assignDB'
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }

    console.log('Connected to the database.');
});

// Get all users
function getUsers(callback) {
    const sql = 'SELECT userID, fname, lname, username, passwd FROM users';

    connection.query(sql, function (err, results) {
        if (err) {
            console.error('Error retrieving users:', err.message);
            callback([]);
            return;
        }

        callback(results);
    });
}

// Add a user
function addUser(user, callback) {
    const sql = 'INSERT INTO users (fname, lname, username, passwd) VALUES (?, ?, ?, ?)';

    const values = [
        user.fname,
        user.lname,
        user.username,
        user.passwd || ''
    ];

    connection.execute(sql, values, function (err, results) {
        if (err) {
            console.error('Error adding user:', err.message);
            return;
        }

        callback(results);
    });
}

// Delete a user
function deleteUser(userID, callback) {
    const sql = 'DELETE FROM users WHERE userID = ?';

    connection.execute(sql, [userID], function (err, results) {
        if (err) {
            console.error('Error deleting user:', err.message);
            return;
        }

        callback(results);
    });
}

module.exports = { getUsers, addUser, deleteUser };