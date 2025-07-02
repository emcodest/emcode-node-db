# emcode-node-db

Easily work with MYSQL - Sequelize in NodeJS Env

### HOW IT WORKS

- Make sure you have your models folder as usual with sequelize
- It will auto create tables based on the schema you stored there

```
const GetDB = require("emcode-node-db")
const db =  GetDB(db_host, db_name, db_username, db_pass, sequelize_options = {port: 3306, dialet: "mysql"})
await db.Select
await db.Insert
await db.Update
await db.Delete
// check GetDB method signature for guide

```