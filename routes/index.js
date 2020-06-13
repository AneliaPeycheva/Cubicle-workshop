const { Router } = require('express');
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes')
const { getAccessories } = require('../controllers/accessories')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')
const router = Router()

router.get('/', async (req, res) => {
    const cubes = await getAllCubes()

    res.render('index', {
        title: 'Cube workshop',
        cubes: cubes
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
    } = req.body

    const cube = new Cube({ name, description, imageUrl, difficultyLevel })

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

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory'
    })
})

router.post('/create/accessory', async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body

    const accessory = new Accessory({ name, description, imageUrl })

    await accessory.save((err) => {
        if (err) {
            console.error(err)
            res.redirect('/create/accessory')
        } else {
            res.redirect('/')
        }
    })
})

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCube(req.params.id)
    let accessories = await getAccessories()
    
    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0
    res.render('attachAccessory', {
        title: 'Attach accessory',
        ...cube,
        accessories,
        canAttachAccessory
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    console.log(req)
    const {
        accessory
    } = req.body
    
    console.log(req.params.id)
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found | Cube workshop'
    })
})

module.exports = router