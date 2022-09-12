import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller as scroll } from "react-scroll";
import { ToastContainer, toast } from 'react-toastify';

const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
        scroll.scrollTo(location.hash.substring(1),{smooth: true});
    }, [location]);
};


function Login(){
    const[email, setemail] = useState("")
    const[emailr, setemailr] = useState("")
    const[password, setpassword] = useState("")
    const[name, setname] = useState("")
    const[lastname, setlastname] = useState("")
    const[role, setrole] = useState('Student')
    const[password1, setpassword1] = useState("")
    const[password2, setpassword2] = useState("")
    const[enabled, setenabled] = useState(false)
    const[signupenabled, setsignupenabled] = useState(false)
    const[loginenabled, setloginenabled] = useState(true)
    const[resetenabled, setresetenabled] = useState(true)
    const[warning, setwarning] = useState("")
    const[resetemail, setresetemail] = useState("")
    const[reset, setreset] = useState(false)

    useScrollToTop()
    
    const login = () => {
        setloginenabled(false)
        const data = {
            email: email,
            password: password
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/login`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                sessionStorage.setItem('token',data.token)
                sessionStorage.setItem('name',data.name)
                window.location = '/'
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                })
                setpassword('')
                setloginenabled(true) 
            }
        })
        .catch(_ => {
            toast.error('Please check your inputs and try again',{
                position:'top-center',
                autoClose: false,
            })
            setloginenabled(true)
        })
    }

    const signup = () => {
        setenabled(false)
        setsignupenabled(true)
        const data = {
            email: emailr,
            password: password1,
            role: role,
            name: name,
            lastname: lastname
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/register`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                window.location = '/#activated'
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                }) 
                setenabled(true)
                setsignupenabled(false)
            }
        })
        .catch(_ => {
            toast.error('Please check your inputs and try again',{
                position:'top-center',
                autoClose: false,
            })
            setenabled(true)
            setsignupenabled(false)
        })
    }

    const reset_password = () => {
        setresetenabled(false)
        const data = {
            email: resetemail,
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/password/reset`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setresetenabled(true)
            if(!data.error){
                window.location = '/#reset'
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                })
            }
        })
        .catch(_ => {
            setresetenabled(true)
            toast.error('Please check your inputs and try again',{
                position:'top-center',
                autoClose: false,
            })
        })
    }

    const checkpw = (e) => {
        let pw1,pw2,em,n,ln;
        if(e.target.name === 'password1'){
            setpassword1(e.target.value);
            em = emailr;
            n = name;
            ln = lastname;
            pw1 = e.target.value;
            pw2 = password2;
        }else if(e.target.name === 'password2'){
            setpassword2(e.target.value);
            em = emailr;
            n = name;
            ln = lastname;
            pw1 = password1;
            pw2 = e.target.value;
        }else if(e.target.name === 'emailr'){
            setemailr(e.target.value);
            em = e.target.value;
            n = name;
            ln = lastname;
            pw1 = password1;
            pw2 = password2;
        }else if(e.target.name === 'first'){
            setname(e.target.value);
            em = emailr;
            n = e.target.value;
            ln = lastname;
            pw1 = password1;
            pw2 = password2;
        }else{
            setlastname(e.target.value);
            em = emailr;
            n = name;
            ln = e.target.value;
            pw1 = password1;
            pw2 = password2;
        }
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
        if(em === '' || n === '' || ln === ''){
            setwarning("Missing fields")
            setenabled(false)
        }else if(pw1 !== pw2){
            setwarning("Passwords don't match")
            setenabled(false)
        }else if(!pw1.match(passw)){
            setwarning("Password must have between 8 and 14 characters, one uppercase letter, one number and one spetial character")
            setenabled(false)
        }else{
            setwarning('')
            setenabled(true)
        }
    }

    return(
        <div>
            <Header/>
            <section>
                <div className="c-split">
                    <div className="c-container">
                        <div className="c-input" id="login">
                            <h2 className="c-split__title">Log In</h2>
                            <label htmlFor="email" ><strong>Email</strong> </label>
                            <input className="input" type="email" id="email" name="email" value={email} onChange={(e) => {setemail(e.target.value)}}/>
                            <label htmlFor="password" ><strong>Password</strong> </label>
                            <input className="input" type="password" id="password" name="password" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
                            {loginenabled?
                            <button className="c-module__button" onClick={login}>Login</button>
                            :
                            <div>
                                <button className="c-module__button disabled" disabled>Login</button>
                                <div className="loading-spinner"></div>
                            </div>
                            }
                            
                            <p className="clickable" onClick={() => {setreset(true)}}>Forgot your password?</p>

                            {reset ?
                            <div>
                                <label htmlFor="resetemail" ><strong>Email</strong> </label>
                                <input className="input" type="email" id="resetemail" name="resetemail" value={resetemail} onChange={(e) => {setresetemail(e.target.value)}}/>
                                {resetenabled?
                                <button className="c-module__button" onClick={reset_password}>Reset Password</button>
                                :
                                <div>
                                    <button className="c-module__button disabled" disabled>Reset Password</button>
                                    <div className="loading-spinner"></div>
                                </div>
                                
                                }
                            </div>
                            :
                            null
                            }
                            
                        </div>
                        <div className="c-output" id="signup">
                            <h2 className="c-split__title">Sign Up</h2>
                            <div className="flex">
                                <div className="c-50">
                                    <label htmlFor="first" ><strong>First Name</strong> </label><br/>
                                    <input className="input" type="text" id="first" name="first" value={name} onChange={checkpw}/>
                                </div>
                                <div className="c-50">
                                    <label htmlFor="last" ><strong>Last Name</strong> </label><br/>
                                    <input className="input" type="text" id="last" name="last" value={lastname} onChange={checkpw}/>
                                </div>
                                <div className="c-50">
                                    <label htmlFor="emailr" ><strong>Email</strong> </label><br/>
                                    <input className="input" type="emailr" id="emailr" name="emailr" value={emailr} onChange={checkpw}/>
                                </div>
                                <div className="c-50">
                                    <label htmlFor="activity" ><strong>Activity</strong> </label><br/>
                                    <select className="input" type="number" id="activity" name="activity" value={role} onChange={(e) => {setrole(e.target.value)}}>
                                        <option value="Student" >Student</option>
                                        <option value="Researcher" >Researcher</option>
                                        <option value="Hobbyst" >Hobbyst</option>
                                    </select><br/>
                                </div>
                                <div className="c-50">
                                    <label htmlFor="password1" ><strong>Password</strong> </label><br/>
                                    <input className="input" type="password" id="password1" name="password1" value={password1} onChange={checkpw}/>
                                </div>
                                <div className="c-50">
                                    <label htmlFor="password2" ><strong>Confirm Password</strong> </label><br/>
                                    <input className="input" type="password" id="password2" name="password2" value={password2} onChange={checkpw}/>  
                                </div>
                                <div className="warning">
                                    {warning}
                                </div>
                                {enabled?
                                <button className="c-module__button" onClick={signup}>SignUp</button>
                                :
                                <button className="c-module__button disabled" disabled>SignUp</button>
                                }
                                {signupenabled?
                                <div className="loading-spinner"></div>
                                :
                                null
                                }
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

export default Login