# emcode-node-db

Easily work with MYSQL - Sequelize in NodeJS Env

### HOW IT WORKS

- Make sure you have your models folder as usual with sequelize and also know the path
- It will auto create tables based on the schema you stored there

```
const GetDB = require("emcode-node-db")
const db =  GetDB(db_host, db_name, db_username, db_pass, models_path, sequelize_options = {port: 3306, dialect: "mysql"})
await db.Select
await db.Insert
await db.Update
await db.Delete
// check GetDB method signature for guide

```

```
// from root folder of your prject: models/user.js

// models/user.js (or models/user.ts if using TypeScript)

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "UindexEmail"
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "UindexPhone"
        },
    }, {
        underscored: true,

        freezeTableName: true
    });

    return User;
};






```
