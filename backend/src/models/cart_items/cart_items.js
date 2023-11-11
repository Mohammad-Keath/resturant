module.exports = (sequelize,datatypes)=>{
    const model = sequelize.define('cart_items',{
        quantity:{
            type:datatypes.INTEGER
        },
        time:{
            type:datatypes.STRING
        },
        note:{
            type:datatypes.STRING
        }

    })
    return model
}