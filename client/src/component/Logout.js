import React,{useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthoProvider.js'
export default function Logout() {
    const history = useHistory()
    const {checkSession} = useAuth()
    useEffect(()=>{
        (async function(){
            try{
            await axios.get('http://localhost:3000/logout')
            await checkSession()
            history.push('/')
            }
            catch(err)
            {
                console.log(err)
            }
        })()
    },[])
    return (
        <>
            
        </>
    )
}
