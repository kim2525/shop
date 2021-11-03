import React,{useState, useEffect} from 'react'
import {useAuth} from '../context/AuthoProvider'

export default function Home() {
    const {currentUser, checkSession} = useAuth()
    const [content,setContent] = useState("")
    useEffect(() => {
        // checkSession()
        if(currentUser.username !== undefined) setContent("Hi " + currentUser.username)
    }, [currentUser])
    return (
        <>
        <h1>{content}</h1>
        </>
    )
}
