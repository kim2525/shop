const express = require("express")
const app = express()
const path = __dirname + '/views/'
app.use(express.static(path))
const session = require('express-session')
const port = process.env.PORT || 3000
//set session info
let sess = {
  secret: 'dhfsjkhdkfhjkh1238478hjfgdkhgfdjkh18798ehgfdhfdkjggfhjkdhkj',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge:60000}
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies

  //set cors
  const cors = require("cors")
  app.use(cors({origin: 'http://localhost:3000',credentials: true}))
}

app.use(session(sess))

//set json and urlencoding
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/currentUser', function(req,res){
  console.log(req.session.userInfo)
  if(req.session.userInfo !== undefined) res.json({userInfo:req.session.userInfo})
  else res.json({userInfo:{}})
})

app.get('/logout', function(req,res){
  console.log(req.session)
  console.log(req.sessionID)
  req.session.destroy()
  console.log(req.session)
  res.end()
})
//need to get * not / to let client react route work
app.get('*', function (req,res) {
    res.sendFile(path + "index.html");
});


const pgRouter = require('./models/pg')
app.use('/pgRouter', pgRouter)

app.listen(port, () => {
  console.log(`listening on ${port}`)
})