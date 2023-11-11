module.exports = (sequelize,datatypes)=>{
    const model = sequelize.define('maintenance',{
        date:{
            type:datatypes.DATE,
            allowNull:false
        },
        impact_of_resturant:{
            type:datatypes.ENUM('Complete shutdown','Partial shutdown','Normal operation'),
            allowNull:false
        },
        price:{
            type:datatypes.INTEGER,
            allowNull:false
        },
        comment:{
            type:datatypes.STRING
        }
    })
    return model
}