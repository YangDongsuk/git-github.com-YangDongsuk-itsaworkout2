/* TODO: 이것도 에러 떠서 일단 주석 ㅠㅠ */

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");
//
// const User = sequelize.define("user", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     name: Sequelize.STRING,
//     record: Sequelize.INTEGER,
// });
//
// module.exports = User;
const db = require('../config/database');

module.exports = class User {
    constructor(userIndex, userName, score) {
        this.userIndex = userIndex;
        this.userName = userName;
        this.score = score;
    }
    save(level) {
        if (level === 10) {
            return db.execute('INSERT INTO hard(userName,score,date) VALUES(?,?,CURDATE())',
                [this.userName, this.score]);
        }
        else if (level === 8) {
            return db.execute('INSERT INTO normal(userName,score,date) VALUES(?,?,CURDATE())',
                [this.userName, this.score]);
        }
        if (level === 7) {
            return db.execute('INSERT INTO easy(userName,score,date) VALUES(?,?,CURDATE())',
                [this.userName, this.score]);
        }
    }

    static fetchAll() {
        var sql1 = 'SELECT * FROM easy; ';
        var sql2 = 'SELECT * FROM normal; ';
        var sql3 = 'SELECT * FROM hard; ';
        // return db.execute('SELECT * FROM easy');
        return db.query(sql1 + sql2 + sql3);
    }
};