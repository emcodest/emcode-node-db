# emcode-node-db

Easily work with MYSQL - Sequelize in NodeJS Env

### HOW IT WORKS

- Make sure you have your models folder as usual with sequelize
- It will auto create tables based on the schema you stored there

```

const db = new Database(db_host, db_name, db_username, db_pass, port = 3306, sequelize_options = {})


```