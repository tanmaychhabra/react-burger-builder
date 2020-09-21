import React from 'react'
import burgerLogo from '../../assets/Images/burger-logo.png'
import './Logo.css'

const Logo = (props) =>(
    <div className = "Logo" style = {{height: props.height}}>
        <img src = {burgerLogo} alt = "My Burger Application"/>
    </div>

)

export default Logo;