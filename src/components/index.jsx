import './static/css/index.css'
import arrow from './static/img/arrow-article.png'
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller as scroll } from "react-scroll";
import { ToastContainer, toast } from 'react-toastify';

const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
        if(location.hash === '#activated'){
            toast.success('Check your email and activate your account',{
                position:'top-center',
                autoClose: false,
            })
        }else if(location.hash === '#changes'){
            toast.success('Your changes were updated',{
                position:'top-center',
                autoClose: false,
            })
        }else if(location.hash === '#reset'){
            toast.success('Check your email and reset your password',{
                position:'top-center',
                autoClose: false,
            })
        }else if(location.hash === '#contact'){
            toast.success("We'll contact you as soon as possible",{
                position:'top-center',
                autoClose: false,
            })
        }else if(location.hash === '#active'){
            toast.success("Activated",{
                position:'top-center',
                autoClose: false,
            })
        }else if(location.hash === '#notactive'){
            toast.error("Something is wrong, please try again",{
                position:'top-center',
                autoClose: false,
            })
        }else{
            scroll.scrollTo(location.hash.substring(1),{smooth: true});
        }
    }, [location]);
};

function Index(){
    useScrollToTop()

    const [articles, setarticles] = useState([])
    const [news, setnews] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/news`)
        .then(response => response.json())
        .then(response => {
            setarticles(response.articles)
            setnews(response.news)
        })
    },[])
    return(
        <div>
            <Header/>
            <section>
                <div className="c-hero">
                    <div className="c-hero__container">
                        <div className="c-hero__mask"></div>
                        <div className="c-hero__content">
                            <div className="c-hero__copy">
                                <h1 className="c-hero__title">Check Out our <span>Latest Module</span></h1>
                                <a href="/mesh" className="c-hero__cta">Check out</a>
                                <p>Upcoming modules:</p>
                                <ul>
                                    <li>Airfoil Calculator - Weighted selection matrix</li>
                                    <li>Blade Element theory (BEM) Calculator</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about">
                <div className="c-split">
                    <div className="c-container">
                        <div className="c-split__content">
                            <h2 className="c-split__title">Who We Are & What We Offer</h2>
                        </div>
                        <div className="c-split__text">
                            <p>We develop useful, reliable and accurate modules to assist your design and projects, such as:</p>
                            <ul>
                                <li>Airfoil optimization tailored to your requirements of lift and Reynolds</li>
                                <li>2D structured mesh airfoil generation with required standards of y+ and element quality to your CFD studies</li>
                                <li>Static-dynamic thrust analysis of propellers and takeoff</li>
                                <li>Battery Endurance</li>
                            </ul>
                            <p>
                                We are actively generating new modules of aerospace design and optimization. You can also contact us for personalized support for different modules not available yet, such as propeller design, CFD studies, wind tunnel tests, among others.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <section id="modules">
                <div className="c-cta">
                    <h3 className="c-cta__title">Modules</h3>
                    <div className="c-container">
                        <div className="c-cta__buttons">
                            <a href="/airfoil" className="c-cta__button">Airfoil Optimization</a>
                            <a href="/thrust" className="c-cta__button">Propeller Thrust & Take-Off Analysis</a>
                            <a href="/battery" className="c-cta__button">Battery Calculator</a>
                            <a href="/mesh" className="c-cta__button">Airfoil Mesh for CFD</a>
                        </div>
                    </div>
                    <div className="c-container">
                        <h2>Login and get full access to all modules</h2>
                    </div>
                </div>
            </section>

            <section>
                <div className="c-publications">
                    <div className="c-container">
                        <div className="c-publications__wrapper">
                            <h1 className="c-publications__title">Related Published Articles</h1>
                            <div className="c-publications__content">
                                <div className="c-publications__main">
                                    <ul className="c-publications__articles"/>
                                        {articles.map(article => (
                                            <li key={article.title} className="c-publications__article">
                                                <small className="c-publications__date">{article.date}</small>
                                                <div className="c-publications__desc">
                                                    <p className="c-publications__text">{article.title}</p>
                                                    <a href={article.link}>
                                                        <img src={arrow} alt=""/>
                                                    </a>
                                                </div>
                                            </li>
                                        ))}                                           
                                </div>
                                <div className="c-publications__sidebar">
                                    <h2 className="c-publications__subtitle">News</h2>
                                    <ul className="c-publications__news">
                                        {news.map(page_news => (
                                            <li className="c-publications__article--news">
                                                <small className="c-publications__date">{page_news.date}</small>
                                                <div className="c-publications__desc--news">
                                                    <p className="c-publications__text">{page_news.title}</p>
                                                    <p className="c-publications__text--news">{page_news.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="c-split c-split--black">
                    <div className="c-container">
                        <div className="c-split__content">
                            <h2 className="c-split__title c-split__title--white">Donations</h2>
                        </div>
                        <div className="c-split__text c-split__text--white">
                            <p>
                                Support our developers and help to grow up this proyect
                            </p>
                            <form action="https://www.paypal.com/donate" method="post" target="_top">
                                <input type="hidden" name="hosted_button_id" value="Q3RBZJXRXR38E" />
                                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                                <img alt="" src="https://www.paypal.com/en_CO/i/scr/pixel.gif"/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
            <ToastContainer/>
        </div>
    )
}

export default Index