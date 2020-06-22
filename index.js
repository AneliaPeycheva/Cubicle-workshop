const env = process.env.NODE_ENV || 'development';

const mongoose=require('mongoose')
const connectionStr = 'mongodb://localhost:27017/cubicledb'
const config = require('./config/config')[env];
const express=require('express')
const indexRouter=require('./routes')
const authRouter=require('./routes/auth')
const cubeRouter=require('./routes/cube')
const accessoryRouter=require('./routes/accessory')

const app = express();
mongoose.connect(connectionStr,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
},function (err) {
    if (err) {
        console.error('Something happend with DB')
        throw err
    }
    console.log('Database is setup and running')
})

require('./config/express')(app)

app.use('/',authRouter)
app.use('/',cubeRouter)
app.use('/',accessoryRouter)
app.use('/',indexRouter)


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found | Cube workshop'
    })
})

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));