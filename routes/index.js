const { Router } = require('express');

const router = Router()

router.get('/', (req, res) => {
    res.render('index',{
        title:'Cube workshop'
    })
})
router.get('/about', (req, res) => {
    res.render('about',{
        title:'About | Cube workshop'
    })
})
router.get('/create', (req, res) => {
    res.render('create',{
        title:'Create | Cube workshop'
    })
})
router.get('/details/:id', (req, res) => {
    res.render('details',{
        title:'Details | Cube workshop '
    })
})
router.get('*', (req, res) => {
    res.render('404',{
      title:'Page not found | Cube workshop'  
    })
})

module.exports = router