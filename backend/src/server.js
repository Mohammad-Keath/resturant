const express = require('express')
const app = express()
const cors = require('cors')
const user_router = require('./routes/users')
const cart_router = require('./routes/cart_items')
const items_router = require('./routes/items')
const maintenance_router = require('./routes/maintenance')

app.use(cors());
app.use(express.json());
app.use(user_router)
app.use(cart_router)
app.use(items_router)
app.use(maintenance_router)

const start = (port)=>{
    app.listen(port,()=>{
        console.log(`the app is up and listen in port ${port}`);
    })
}
module.exports={
    start,app
}