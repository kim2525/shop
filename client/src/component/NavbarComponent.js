import React from 'react'
// import {Navbar, Nav} from 'react-bootstrap'
// import {LinkContainer} from 'react-router-bootstrap'
import { useState } from 'react';
import{Link} from 'react-router-dom';
import {useAuth} from '../context/AuthoProvider.js'

function NavbarComponent() {
    const {currentUser} = useAuth()

    let content = <><Link to="/login" className="first-right right" >登入</Link><Link to="/signup" className="right">註冊</Link></>
    if(currentUser.username !== undefined) content = <Link to="/logout" className="first-right right">登出</Link>
    let info = <><Link to="/" className="left" >Home</Link></>
    if(currentUser.username !== undefined) info = [info , <Link to="/userprofile" className="left"> 使用者資料</Link>]
    console.log(currentUser)
    return (
        <div className="header">
            {info}
            {content}
        </div>
        // <Navbar bg="dark" variant="dark">
        //     <LinkContainer to="/">
        //         <Navbar.Brand> Home</Navbar.Brand>
        //     </LinkContainer>
        //     <Navbar.Collapse className="justify-content-end">
        //         <Nav>
        //             <LinkContainer to="/login">
        //             <Nav.Link className = "hlink"> login</Nav.Link>
        //             </LinkContainer>
        //         </Nav>
        //     </Navbar.Collapse>
        // </Navbar>
    )
}

export default NavbarComponent;