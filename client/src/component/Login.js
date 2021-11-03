import React ,{useRef}from 'react'
import { useAuth } from '../context/AuthoProvider'
import {useHistory} from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const history = useHistory()

    async function handleSubmit(e)
    {
        e.preventDefault()
        const email = emailRef.current.value
        const password =passwordRef.current.value
        const res = await login(email, password)

        if(res.message === "error")
        {
            //known, unknown is set in Authoprovider
            if(res.error_type === "known") alert(res.error_detail)
            if(res.error_type === "unknown") console.log(res.error_detail)
            return
        }

        history.push('/')

    }

    return (
        <form className="input_group" onSubmit={handleSubmit}>
            <div className="input_box">
                <p>信箱</p>
                <input type="text" className="input" name="email" ref={emailRef}></input>
            </div>

            <div className="input_box">
                <p>密碼</p>
                <input type="password" className="input" name="password" ref={passwordRef}></input>
            </div>
            
            <div className="button_group">
                <input type="submit" value="送出" className="submit" ></input>
            </div>
            
        </form>
    )

   
}
