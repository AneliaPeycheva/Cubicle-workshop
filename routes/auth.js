const express = require("express")
const {saveUser,verifyUser,guestAccess,getUserStatus}=require('../controllers/users')
const router = express.Router();

router.get("/login",guestAccess,getUserStatus,(req, res) => {
  const error=req.query.error?'Username or password is not valid':null
    res.render('login',{
      isLoggedIn: req.isLoggedIn,
      error
    })
})

router.post("/login", async (req, res) => {
  const {error}=await verifyUser(req,res)
  if (error){
    return res.render('login',{
      error:'Username or password is not correct'
    })
  }
  res.redirect('/')
})

router.get("/register",guestAccess,getUserStatus, (req, res) => {
  const error=req.query.error?'Username or password is not valid':null

  res.render('register',{
      isLoggedIn: req.isLoggedIn,
      error
    })
})

router.post("/register", async (req, res) => {
  const {
    password,
    repeatPassword
} = req.body

if (password!==repeatPassword){
  return res.render('register',{
    error:"Re-password should be the same as the given password"
  })
}

if (!password || password.length<8 || !password.match(/^[A-Za-z0-9]+$/) ){

        // res.redirect('register?error=true')
        return res.render('register',{
          error:"Password is not valid"
        })
    }
      const {error}=await saveUser(req,res)
      if (error){
        return res.render('register',{
          error:"Username or password is not valid"
        })
      }
      res.redirect('/')
})


module.exports = router;