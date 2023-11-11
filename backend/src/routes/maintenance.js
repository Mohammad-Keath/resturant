const express = require('express')
const router = express.Router()
const {maintenance_model}=require('../models/index')
const bearer = require('../middleware/bearer')
const acl = require('../middleware/acl')


router.get('/maintenance',handleGetMaintenance)
router.post('/maintenance',bearer,acl('admin'),handlePostMaintenance)
router.put('/maintenance/:id',bearer,acl('admin'),handleUpdateMaintenance)
router.delete('/maintenance/:id',bearer,acl('admin'),handledeleteMaintenance)

async function handleGetMaintenance (req,res){
    try{
        const items =await maintenance_model.findAll()
        res.json(items)
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handlePostMaintenance (req,res){
    try{
        await maintenance_model.create(req.body)
        res.json('item has been added')
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handleUpdateMaintenance (req,res){
    try{
        const item =await maintenance_model.findOne({where:{id:req.params.id}})
        await item.update(req.body)
        res.json('Item updated')
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handledeleteMaintenance (req,res){
    try{
        await maintenance_model.delete({where:{id:req.params.id}})
        res.json('Item deleted')
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = router