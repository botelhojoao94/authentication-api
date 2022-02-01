const db = require('../database/dbConnection')

module.exports = class UserModel {
    static checkUser(user, callback) {
        return db.query("select * from users as us where email = ?", [user.email], callback);
    }

    static addUser(user, callback) {
        return db.query("insert into users (id, name, email, password) values(uuid(), ?, ?, ?)", [user.name, user.email, user.password], callback);
    }
}
