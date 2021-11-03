require('dotenv').config()
const express = require('express')
const router = express.Router()
const Pool = require('pg').Pool
const bcrypt = require('bcrypt')

const pool = new Pool()

router.post('/signUp',async (req,res)=>{
    const userName = req.body.userName
    const password = req.body.password
    const email = req.body.email
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        const result = await pool.query("insert into accounts (username, password, email) values($1,$2,$3) RETURNING *",[userName,hashedPassword,email])
        res.json({message:"create success", userName: result.rows[0].username})
    }
    catch(err){
        res.json({message:"error", error_detail:err.detail})
    }
})

router.post('/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    try{
        const result = await pool.query("select * from accounts where email=$1",[email])
        if(await bcrypt.compare(password,result.rows[0].password))
        {
            //set session need to before the res.json otherwise it won't set correctly
            delete result.rows[0].password
            req.session.userInfo = result.rows[0]
            res.json({message:"success", userInfo: result.rows[0]})
        }
        else
        {
            res.json({message:"wrong password"})
        }
    }
    catch(err){
        res.json({message:"error",error_detail:err.detail})
    }
})

router.post('/userProfile',async(req,res)=>{
    const userName = req.body.userName
    const email = req.body.email
    const birth = req.body.birth
    const phone = req.body.phone
    console.log(birth)
    try{
        const result = await pool.query("update accounts set username=$1, birth=$2, phone_number=$3 where email=$4 RETURNING *",[userName,birth,phone,email])
        delete result.rows[0].password
        console.log(result)
        req.session.userInfo = result.rows[0]
        res.json({message:"success"})
    }
    catch(err){
        console.log(err)
        res.json({message:"error",error_detail:err.detail})
    }
})
module.exports = router