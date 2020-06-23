const env = process.env.NODE_ENV || 'development'

const jwt = require('jsonwebtoken')
const config = require('../config/config')[env];
const bcrypt = require('bcrypt');
const User = require('../models/user')
const saltRounds = 10;

const generateToken = (data) => {
    const token = jwt.sign(data, config.privateKey)
    return token
}

const saveUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        password: hashedPassword
    })

    const userObject = await user.save()

    const token = generateToken({
        userId: userObject._id,
        username: userObject.username
    })

    res.cookie('aid', token)
    return true
}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    const user = await User.findOne({ username })

    const status = await bcrypt.compare(password, user.password);

    if (status) {
        const token = generateToken({
            userId: user._id,
            username: user.username
        })
        res.cookie('aid', token)
    }
    return status
}

const checkAuthentication = (req, res, next) => {
    const token = req.cookies['aid']

    if (!token) {
        return res.redirect('/')
    }
    try {
        jwt.verify(token, config.privateKey)
        next()
    } catch (error) {
        res.redirect('/')
    }  
}
const guestAccess = (req, res, next) => {
    const token = req.cookies['aid']

    if (token) {
        return res.redirect('/')
    }
    next()
}
const getUserStatus=(req,res,next)=>{
    const token = req.cookies['aid']

    if (!token) {
      req.isLoggedIn=false   
    } 
    try {
        jwt.verify(token, config.privateKey)
        req.isLoggedIn=true       
    } catch (error) {
        req.isLoggedIn=false
    }  
    next()
}

module.exports = {
    saveUser,
    verifyUser,
    checkAuthentication,
    guestAccess,
    getUserStatus
}
