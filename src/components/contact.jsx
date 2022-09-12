import Header from './header.jsx'
import Footer from './footer.jsx'
import milo from './static/img/milo.png'
import hoyos from './static/img/hoyos.png'
import negro from './static/img/negro.png'
import linkedin from './static/img/Linkedin2.png'

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Contact(){

    const[email, setemail] = useState("")
    const[name, setname] = useState("")
    const[request, setrequest] = useState("")
    const[enabled, setenabled] = useState(true)
    
    
    const submit = () => {
        setenabled(false)
        const data = {
            name: name,
            email: email,
            request: request
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/contact`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setenabled(true)
            if(!data.error){
                window.location = '/#contact'
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                })
            }
        })
        .catch(_ => {
            setenabled(true)
            toast.error('Please check your inputs and try again',{
                position:'top-center',
                autoClose: false,
            })
        })
    }
    return(
        <div>
            <Header/>
            <section>
                <div className="c-split">
                    <div className="c-container">
                        <div className="c-input" id="login">
                            <h2 className="c-split__title">Contact Us</h2>
                            <label htmlFor="name" ><strong>Your name:</strong> </label>
                            <input className="input" type="text" id="name" name="name" value={name} onChange={e => setname(e.target.value)}/>
                            <label htmlFor="email" ><strong>Your email</strong> </label>
                            <input className="input" type="email" id="email" name="email" value={email} onChange={e => setemail(e.target.value)}/>
                            <label htmlFor="request" ><strong>What can we do for you?</strong> </label>
                            <textarea className="input" id="request" name="request" rows="6" value={request} onChange={e => setrequest(e.target.value)}></textarea>
                            {enabled?
                            <button className="c-module__button" onClick={submit}>Change</button>
                            :
                            <div>
                                <button className="c-module__button disabled">Change</button>
                                <div className="loading-spinner"></div>
                            </div>
                            }
                            
                        </div>
                        <div className="c-output" id="signup">
                            <h2 className="c-split__title">Meet our team</h2>
                            <div className="flex">
                                <div className="c-33">
                                    <img src={milo} alt="negro" width="100%" className="image-round"></img>
                                    <h2>Camilo Echavarria</h2>
                                    <p>Aerospace Algorithms Developer</p>
                                    <a href="https://www.linkedin.com/in/camilo-echavarr%C3%ADa-mart%C3%ADnez-aa0660159/"><img alt="Qries" src={linkedin} width="25" height="25"/></a>
                                </div>
                                <div className="c-33">
                                    <img src={hoyos} alt="negro" width="100%" className="image-round"></img>
                                    <h2>José Daniel Hoyos</h2>
                                    <p>Aerospace Algorithms Developer</p>
                                    <a href="https://www.linkedin.com/in/jose-daniel-hoyos-giraldo/"><img alt="Qries" src={linkedin} width="25" height="25"/></a>
                                </div>
                                <div className="c-33">
                                    <img src={negro} alt="negro" width="100%" className="image-round"></img>
                                    <h2>Andrés Herrera</h2>
                                    <p>Software Engineer</p>
                                    <a href="https://www.linkedin.com/in/andres-herrera-9b701b126/"><img alt="Qries" src={linkedin} width="25" height="25"/></a>
                                </div>                             
                            </div>                                             
                        </div>
                        
                    </div>
    
                </div>
            </section>
            <Footer/>
            <ToastContainer/>
        </div>
        )
}

export default Contact