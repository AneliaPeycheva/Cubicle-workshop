const express = require("express")
const {saveUser,verifyUser,guestAccess,getUserStatus}=require('../controllers/users')
const router = express.Router();

router.get("/login",guestAccess,getUserStatus,(req, res) => {
    res.render('login',{
      isLoggedIn: req.isLoggedIn
    })
})

router.get("/register",guestAccess,getUserStatus, (req, res) => {
    res.render('register',{
      isLoggedIn: req.isLoggedIn
    })
})

router.post("/register", async (req, res) => {
      const status=await saveUser(req,res)
      if (status){
        return res.redirect('/')
      }
      res.redirect('/')
})

router.post("/login", async (req, res) => {
  const status=await verifyUser(req,res)
  if (status){
    return res.redirect('/')
  }
  res.redirect('/')
})
module.exports = router;