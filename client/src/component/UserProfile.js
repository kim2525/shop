import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useAuth } from '../context/AuthoProvider'

function isnull(obj)
{
    return Object.keys(obj).length === 0
}
export default function UserProfile() {
    const [email, setEmail] = useState('')
    const [birth, setBirth] = useState(new Date().toISOString().slice(0, 10))
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const {currentUser, checkSession} = useAuth()
    const history = useHistory()
    useEffect(() => {
        checkSession()
        if(isnull(currentUser)) return
        setEmail(currentUser.email)
        setUserName(currentUser.username)
        setBirth(currentUser.birth.slice(0,10))
        setPhone(currentUser.phone_number)
    }, [currentUser])

    async function handleSubmit(e)
    {
        e.preventDefault()
        const user_info = {
            email:email,
            userName: userName,
            birth: birth,
            phone:phone
        }
        const res = await axios.post('http://localhost:3000/pgRouter/userProfile', user_info)
        await checkSession()
        history.push('/')
    }

    function handleChange(e, set)
    {
        set(e.target.value)
    }

    return (
        <form className="input_group" onSubmit={handleSubmit}>
            <div className="input_box">
                <p>信箱</p>
                <input type="text" className="input" name="email" value={email} disabled></input>
            </div>

            <div className="input_box">
                <p>使用者名稱</p>
                <input type="text" className="input" name="userName" value={userName} onChange={e=>{handleChange(e,setUserName)}}></input>
            </div>
            
            <div className="input_box">
                <p>生日</p>
                <input type="date" className="input" name="birth" value={birth} onChange={e=>{handleChange(e,setBirth)}}></input>
            </div>

            <div className="input_box">
                <p>電話</p>
                <input type="text" className="input" name="phone" value={phone} onChange={e=>{handleChange(e,setPhone)}}></input>
            </div>

            <div className="button_group">
                <input type="submit" value="送出" className="submit"></input>
            </div>
            
        </form>
    )
}
