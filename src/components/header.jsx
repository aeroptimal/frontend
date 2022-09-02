import logo from './static/img/logo.png'

import { Link } from "react-scroll";

function Header(){
    return(
        <header className="c-header">
            <nav className="c-nav">
                <a href="/"><img className="c-logo" src={logo} alt="Logo"/></a>
                <ul className="c-nav__menu">
                    <li className="c-nav__item"><Link to="about" smooth={true}>About Us</Link> </li>
                    <li className="c-nav__item"><Link to="modules" smooth={true}>Modules</Link> </li>
                    <li className="c-nav__item"><a href="/contact">Contact Us</a> </li>
                    <li className="c-nav__item"><a href="/login#log">Log In</a> </li>
                    <li className="c-nav__item"><a href="/login#reg">Sign-Up</a> </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header