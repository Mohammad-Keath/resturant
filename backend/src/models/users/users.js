const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
module.exports = (sequelize,datatypes) =>{
    const model = sequelize.define('users',{
        username :{
            type:datatypes.STRING,
            allowNull:false
        },
        email:{
            type:datatypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:datatypes.STRING,
            allowNull:false
        },
        role:{
            type:datatypes.ENUM('admin','customer'),
            defaultValue:'customer'
        },
        token: {
            type: datatypes.VIRTUAL,
            get() {
              return jwt.sign({ email: this.email,role:this.role}, process.env.SECRET);
            },
            set(tokenObj) {
              let token = jwt.sign(tokenObj, process.env.SECRET);
              return token;
            },
          },
    })
    model.authUser = async (email, password) => {
        const user = await model.findOne({ where: { email: email } });
        if (user) {
          const validuser = await bcrypt.compare(password, user.password);
          if (validuser) {
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } else {
          throw new Error("User not found");
        }
      };
      model.bearerToken = async (token) => {
        try {
          const userToken = jwt.verify(token, process.env.SECRET);
          if (userToken) {
            const record = await model.findOne({
              where: { email: userToken.email },
            });
            return record;
          }
        } catch (err) {
          throw new Error(err || "Invalid Token");
        }
      }
    return model
}