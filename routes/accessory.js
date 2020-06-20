const express=require("express")

const router=express.Router();

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
module.exports=router