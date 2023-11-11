const express = require('express')
const router = express.Router()
const {items_model}=require('../models/index')
const bearer = require('../middleware/bearer')
const acl = require('../middleware/acl')


router.get('/items',handleGetItems)
router.get('/item/:id',handleGetItem)
router.post('/item',bearer,acl('admin'),handlePostItem)
router.put('/item/:id',bearer,acl('admin'),handleUpdateItem)
router.delete('/item/:id',bearer,acl('admin'),handledeleteItem)

async function handleGetItems (req,res){
    try{
        const items =await items_model.findAll()
        res.json(items)
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handleGetItem (req,res){
    try{
        const item =await items_model.findOne({where:{id:req.params.id}})
        res.json(item)
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handlePostItem (req,res){
    try{
        await items_model.create(req.body)
        res.json('item has been added')
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handleUpdateItem (req,res){
    try{
        const item =await items_model.findOne({where:{id:req.params.id}})
        await item.update(req.body)
        res.json('Item updated')
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handledeleteItem (req,res){
    try{
        await items_model.delete({where:{id:req.params.id}})
        res.json('Item deleted')
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = router