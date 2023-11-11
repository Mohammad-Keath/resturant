require('dotenv').config()
const {Sequelize,DataTypes}= require('sequelize')
const db_url = process.env.DATABASE_URL
let sequelizeOptions =
process.env.NODE_ENV === "production"
? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
}
: {};
const sequelize = new Sequelize(db_url,sequelizeOptions)

const users_model = require('./users/users')(sequelize,DataTypes)
const maintenance_model = require('./maintenance/maintenance')(sequelize,DataTypes)
const items_model = require('./items/items')(sequelize,DataTypes)
const cart_items_model = require('./cart_items/cart_items')(sequelize,DataTypes)

users_model.belongsToMany(items_model,{through:cart_items_model})
items_model.belongsToMany(users_model,{through:cart_items_model})

module.exports={
    db:sequelize,
    users_model,
    maintenance_model,
    items_model,
    cart_items_model
}
