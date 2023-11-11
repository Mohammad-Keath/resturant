module.exports = (sequelize,datatypes)=>{
    const model = sequelize.define('items',{
        name:{
            type:datatypes.STRING,
            allowNull:false
        },
        description:{
            type:datatypes.STRING,
            allowNull:false
        },
        image:{
            type:datatypes.STRING
        },
        category:{
            type:datatypes.STRING
        }
    })
    return model
}