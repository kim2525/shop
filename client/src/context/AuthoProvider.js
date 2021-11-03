import React ,{useContext, useState, useEffect}from 'react'
import axios  from 'axios'
const AuthContext = React.createContext();

export function useAuth()
{
    return useContext(AuthContext)
}

function isnull(obj)
{
    return Object.keys(obj).length === 0
}
export function AuthoProvider({children}) {
    const [currentUser, setCurrentUser] =useState({})
    async function checkSession(){
        try{
            const res = await axios.get('http://localhost:3000/currentUser')
            if(isnull(currentUser) && isnull(res.data.userInfo)) return  
            if(JSON.stringify(res.data.userInfo) === JSON.stringify(currentUser)) return
            setCurrentUser(res.data.userInfo)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    useEffect(() => {
        checkSession()
    },[])


    async function signup(email, password, userName)
    {
        const user_info = {
            email,password,userName
        }
        const res = await axios.post('http://localhost:3000/pgRouter/signUp', user_info)
        if(res.data.message === "error")
        {
            if(res.data.error_detail.startsWith("Key (email)")) return {message:"error", error_type:"known",error_detail:"email already exist"}

            if(res.data.error_detail.startsWith("Key (username)")) return {message:"error", error_type:"known",error_detail:"user name already exist"}

            return {message:"error", error_type:"unknown",error_detail: res.data.error_detail}
        }
        return {message:"success"}
    }

    async function login(email, password)
    {
        const user_info = {
            email:email,
            password:password
        }
        const res = await axios.post('http://localhost:3000/pgRouter/login', user_info)

        if(res.data.message === "wrong password") return {message:"error", error_type:"known", error_detail:"wrong password"}

        if(res.data.message === "error") return {message:"error", error_type:"unknown",error_detail: res.data.error_detail}
    
        setCurrentUser(res.data.userInfo)
        return {message:"success"}
    }
    const value={currentUser, signup, login, checkSession}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

