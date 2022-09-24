import logo from './static/img/logo.png'

function Footer(){
    return(
        <footer className="c-footer">
            <div className="c-container">
                <div className="c-footer__content">
                    <img src={logo} alt="" className="c-footer__logo"/>
                    <div id="sfcynatkwjbfu5ldgzn3kmf1z2pnspyf2qh"></div>
                    <img src="https://s05.flagcounter.com/count/inGx/bg_000000/txt_FFFFFF/border_000000/columns_2/maxflags_10/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" border="0" width="150" height="65"/>
                        
                    <div className="c-footer__social">
                        <ul className="c-footer__links">
                            <li className="c-footer__link">
                                <a href="https://www.linkedin.com/company/aeroptimal"> <span className="c-footer__icon c-footer__icon--linkedin"></span></a>
                            </li>
                            <li className="c-footer__link">
                                <a href="https://www.youtube.com/channel/UCZlhbjTm0xnSr5RAugOos5g"><span className="c-footer__icon c-footer__icon--youtube"></span></a>
                            </li>
                            <li className="c-footer__link">
                                <a href="https://instagram.com/"> <span className="c-footer__icon c-footer__icon--instagram"></span></a>
                            </li>
                        </ul>
                        <p className="c-footer__copy">© 2021 AerOptimal, All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer