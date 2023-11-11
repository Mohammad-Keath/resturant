const express = require('express')
const router = express.Router()
const {cart_items_model ,users_model}=require('../models/index')
const bearer = require('../middleware/bearer')
const acl = require('../middleware/acl')

router.get('/cart_items/:id',bearer,handleGetCartItems)
router.post('/cart_item',bearer,handlePostCartItem)
router.put('/cart_item/:id',bearer,handleUpdateCartItem)
router.delete('/cart_item/:id',bearer,handledeleteCartItem)

async function handleGetCartItems (req,res){
    try{
        const items =await users_model.findOne({where:{id:req.params.id},include:{all:true}})
        res.json(items)
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handlePostCartItem (req,res){
    try{
        await cart_items_model.create(req.body)
        res.json('item has been added')
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handleUpdateCartItem (req,res){
    try{
        const item =await cart_items_model.findOne({where:{id:req.params.id}})
        await item.update(req.body)
        res.json('Item updated')
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handledeleteCartItem (req,res){
    try{
        await cart_items_model.delete({where:{id:req.params.id}})
        res.json('Item deleted')
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = router