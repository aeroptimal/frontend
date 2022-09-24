import logo from './static/img/logo.png'

function Header(){
    return(
        <header className="c-header">
            <nav className="c-nav">
                <a href="/"><img className="c-logo" src={logo} alt="Logo"/></a>
                <ul className="c-nav__menu">
                    <li className="c-nav__item"><a href="/#about">About Us</a> </li>
                    <li className="c-nav__item"><a href="/#modules">Modules</a> </li>
                    <li className="c-nav__item"><a href="/contact">Contact Us</a> </li>
                    {sessionStorage.getItem('token')?
                        <li className="c-nav__item"><a href="/user">{sessionStorage.getItem('name')}</a> </li>
                    :
                        <li className="c-nav__item"><a href="/login#login">Log In</a> </li>
                    }
                    {sessionStorage.getItem('token')?
                        <li className="c-nav__item"><a href="/" onClick={() => {sessionStorage.removeItem('token');sessionStorage.removeItem('name')}}>LogOut</a> </li>
                    :
                        <li className="c-nav__item"><a href="/login#signup">Sign-Up</a> </li>
                    }
                    
                </ul>
            </nav>
        </header>
    )
}

export default Header