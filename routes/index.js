const { Router } = require('express');
const { getAllCubes} = require('../controllers/cubes')
const {getUserStatus}=require('../controllers/users')

const router = Router()

router.get('/', getUserStatus,async (req, res) => {
    const cubes = await getAllCubes()

    res.render('index', {
        title: 'Cube workshop',
        cubes: cubes,
        isLoggedIn:req.isLoggedIn
    })
})

router.get('/logout',(req,res)=>{
    res.clearCookie('aid')
    res.redirect('/')
})

router.get('/about',getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About | Cube workshop',
        isLoggedIn:req.isLoggedIn
    })
})

module.exports = router