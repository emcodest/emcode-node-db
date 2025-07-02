//!++++++++++++++++++++++++++++++++++++++++++++
// | Manages the database interaction 
//++++++++++++++++++++++++++++++++++++++++++++ 

const { Sequelize, QueryTypes } = require('sequelize');
const models_path = require("path").join(__dirname, "..", "models")
//const UserModel = require("../models/users")
const Utils = require("./lib/Utils")
const util = new Utils()
class Database {

    constructor(db_host, db_name, db_username, db_pass, port = 3306, sequelize_options = {}) {
        this.tables = {}
        this.sequelize = new Sequelize(db_name, db_username, db_pass, {
            host: db_host,
            // dialect: "mysql",
            // port,
            logging: process.env.NODE_ENV != "production" ? true : false,
            sequelize_options
        });


    }
    async Connect() {
        try {
            await this.sequelize.authenticate()
            console.log('\x1b[41m%s\x1b[0m', 'Connected to DB', 'Migrating ...')
            await this.Migrate() // auto create the tables if they don't exist
            console.log('\x1b[41m%s\x1b[0m', 'Created New Tables', '')
        } catch (ex) {
            console.log('\x1b[41m%s\x1b[0m', 'Unable to connect: ', ex)
            return false
        }
        return true
    }

    async Insert(table_name, data) {
        const new_data = await this.tables[table_name].create({
            ...data
        });
        return new_data
    }

    async Select(sql_query, bind = {}) {
        const qy = await this.sequelize.query(sql_query, {
            type: QueryTypes.SELECT,
            bind
            //replacements: { ...replacements } // pass named or positional replacements
        });
        return qy;
    }
    async Update(table_name, data, col) {
        const mres = await this.tables[table_name].update(
            { ...data },     // values to update
            { where: { ...col } }              // filter condition
        )

        return mres

    }
    async Delete(table_name, col) {

        const mres = await this.tables[table_name].destroy({
            where: { ...col }
        });

        return mres

    }

    async Tables() {
        const files = await util.ListFilesInPath(models_path)
        const ufiles = files.map((r) => r.replace(".js", ""))
        return ufiles
    }
    async Migrate() {
        try {
            const tables = await this.Tables();
            for (const tb of tables) {
                const Model = require(`../models/${tb}`);
                const tab = await Model(this.sequelize, Sequelize.DataTypes);
                this.tables[tb] = tab;

                //! associate
                Object.keys(this.tables).forEach((modelName) => {
                    if ("associate" in this.tables[modelName]) {
                        this.tables[modelName].associate(this.tables);
                    }
                });


            }
            await this.sequelize.sync({
                alter: true,
                force: false,
            }); // ensure sync completes
            return true;
        } catch (error) {
            console.error("Migration failed:", error);
            return false;
        }
    }


}

let dbInstance
/** get a single instance of the db */
async function GetDB(db_host, db_name, db_username, db_pass, sequelize_options = { port: 3306, dialect: "mysql" }) {
    if (dbInstance) {
        console.log('\x1b[41m%s\x1b[0m', '## cached db instance returned', '')
        return dbInstance
    }
    dbInstance = new Database(db_host, db_name, db_username, db_pass, sequelize_options)
    await dbInstance.Connect()
    return dbInstance
}

module.exports = GetDB