import React ,{useRef}from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthoProvider'
function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const userNameRef = useRef()
    const history = useHistory()
    console.log(useAuth())
    const {signup} = useAuth()

    async function handleSubmit(e)
    {
        e.preventDefault()
  
        const email=emailRef.current.value
        const password=passwordRef.current.value
        const userName= userNameRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if(password !== confirmPassword) 
        {
            alert("密碼不相同")
            return
        }

        const res = await signup(email, password, userName)
        if(res.message === "error")
        {
            if(res.error_type === "known") 
            {
                alert(res.error_detail)
                return
            }
            console.log(res.error_detail)
            return
        }

        history.push('/login')
        // emailRef.current.value = ''
        // passwordRef.current.value = ''
        // userNameRef.current.value = ''
        // confirmPasswordRef.current.value = ''

    }

    return (
        <form className="input_group" onSubmit={handleSubmit}>
            <div className="input_box">
                <p>信箱</p>
                <input type="text" className="input" name="email" ref={emailRef}></input>
            </div>

            <div className="input_box">
                <p>使用者名稱</p>
                <input type="text" className="input" name="userName" ref={userNameRef}></input>
            </div>
            <div className="input_box">
                <p>密碼</p>
                <input type="password" className="input" name="password" ref={passwordRef}></input>
            </div>

            <div className="input_box">
                <p>確認密碼</p>
                <input type="password" className="input" name="confirmPassword" ref={confirmPasswordRef}></input>
            </div>
            
            <div className="button_group">
                <input type="submit" value="送出" className="submit"></input>
            </div>
            
        </form>
    )
}

export default SignUp
