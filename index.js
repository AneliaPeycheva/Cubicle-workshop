const env = process.env.NODE_ENV || 'development';

const mongoose=require('mongoose')
const connectionStr = 'mongodb://localhost:27017/cubicledb'
const config = require('./config/config')[env];
const express=require('express')
const indexRouter=require('./routes')
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
app.use('/',indexRouter)


app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));