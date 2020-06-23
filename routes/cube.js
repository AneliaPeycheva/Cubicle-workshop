const env=process.env.NODE_ENV || 'development'
const jwt = require('jsonwebtoken')
const express=require("express")
const Cube=require('../models/cube')
const {checkAuthentication,getUserStatus}=require('../controllers/users')
const {getCubeWithAccessories}=require('../controllers/cubes')
const config = require('../config/config')[env];

const router=express.Router();


router.get('/create',checkAuthentication,getUserStatus, (req, res) => {
    console.log(req.cookies['aid'])
    res.render('create', {
        isLoggedIn: req.isLoggedIn
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

router.get('/details/:id', getUserStatus,async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)
    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube,
        isLoggedIn: req.isLoggedIn
    })
})

router.get("/edit",checkAuthentication, getUserStatus,(req,res)=>{
    res.render('editCube',{
        isLoggedIn: req.isLoggedIn
    })
})
router.get("/delete",checkAuthentication,getUserStatus,(req,res)=>{
    res.render('deleteCube',{
        isLoggedIn: req.isLoggedIn
    })
})

module.exports=router;