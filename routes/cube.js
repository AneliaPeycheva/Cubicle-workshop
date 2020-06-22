const env=process.env.NODE_ENV || 'development'
const jwt = require('jsonwebtoken')
const express=require("express")
const Cube=require('../models/cube')
const config = require('../config/config')[env];

const router=express.Router();


router.get('/create', (req, res) => {
    res.render('create', {
        // title: 'Create | Cube workshop'
    })
})

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const token=req.cookies['aid']
    console.log(token);
    
    const decodedObject=jwt.verify(token,config.privateKey)
   

    const cube = new Cube({ name, description, imageUrl, difficultyLevel,creatorId:decodedObject.userId })

    cube.save((err) => {
        if (err) {
            console.error(err)
            res.redirect('/create')
        } else {
            res.redirect('/')
        }
    })
})

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)
    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube
    })
})

router.get("/edit",(req,res)=>{
    res.render('editCube')
})
router.get("/delete",(req,res)=>{
    res.render('deleteCube')
})

module.exports=router;