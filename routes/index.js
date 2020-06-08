const { Router } = require('express');
const { getAllCubes,getCube } = require('../controllers/cubes')

const Cube=require('../models/cube')
const router = Router()

router.get('/', async (req, res) => { 
    const cubes=await getAllCubes()
  
        res.render('index', {
            title: 'Cube workshop',
            cubes:cubes
        })
    })



router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube workshop'
    })
})

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
    }=req.body

    const cube=new Cube({name,description,imageUrl,difficultyLevel})

    cube.save((err)=>{
        if(err){
            console.log(err)
        } else {
            res.redirect('/')
        }       
    })
})

router.get('/details/:id', async (req, res) => {
    const cube=await getCube(req.params.id)
         res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube  
    })
  })


router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found | Cube workshop'
    })
})

module.exports = router