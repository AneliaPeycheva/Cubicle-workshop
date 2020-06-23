const express=require("express")
const {checkAuthentication,getUserStatus}=require('../controllers/users')
const {updateCube,getCube}=require('../controllers/cubes')
const {getAccessories}=require('../controllers/accessories')
const Accessory=require('../models/accessory')

const router=express.Router();

router.get('/create/accessory', checkAuthentication,getUserStatus,(req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create/accessory', checkAuthentication,async (req, res) => {
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

router.get('/attach/accessory/:id', checkAuthentication,getUserStatus,async (req, res) => {
    const cube = await getCube(req.params.id)
    let accessories = await getAccessories()
    
    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0
    res.render('attachAccessory', {
        title: 'Attach accessory',
        ...cube,
        accessories,
        canAttachAccessory,
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/attach/accessory/:id', checkAuthentication,getUserStatus,async (req, res) => {
  
    const {
        accessory
    } = req.body
 
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})
module.exports=router