import Header from './header.jsx'
import Footer from './footer.jsx'

import { useEffect, useState } from 'react';
import { useLocation  } from 'react-router-dom';
import { scroller as scroll } from "react-scroll";
import { ToastContainer, toast } from 'react-toastify';

const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
        if(location.hash.substring(1)){
            scroll.scrollTo(location.hash.substring(1),{smooth: true});
        }
    }, [location]);
};


function User(){
    const[password, setpassword] = useState("")
    const[email, setemail] = useState("")
    const[name, setname] = useState("")
    const[lastname, setlastname] = useState("")
    const[role, setrole] = useState('Student')
    const[password1, setpassword1] = useState("")
    const[password2, setpassword2] = useState("")
    const[enabled, setenabled] = useState(false)
    const[loginenabled, setloginenabled] = useState(false)
    const[loadingpassword, setloadingpassword] = useState(false)
    const[warning, setwarning] = useState("")

    useScrollToTop()

    useEffect(() => {
        setenabled(false)
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                setemail(data.email)
                setname(data.name)
                setlastname(data.last_name)
                setrole(data.role)
                setenabled(true)
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                })
            }
        })
        .catch(_ => {
            toast.error('Please check your inputs and try again',{
                position:'top-center',
                autoClose: false,
            })
        })
    },[])
    
    const change_password = () => {
        setloginenabled(false)
        setloadingpassword(true)
        const data = {
            password1: password1,
            password: password
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/password`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                window.location = '/#changes'
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                })
                setloginenabled(true)
                setloadingpassword(false) 
            }
        })
        .catch(_ => {
            toast.error('Please check your inputs and try again',{
                position:'top-center',
                autoClose: false,
            })
            setloginenabled(true)
            setloadingpassword(false)
        })
    }

    const update_user = () => {
        const data = {
            role: role,
            name: name,
            lastname: lastname
        }
        setenabled(false)
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/update`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                window.location = '/#changes'
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                })
                setenabled(true) 
            }
        })
        .catch(_ => {
            toast.error('Please check your inputs and try again',{
                position:'top-center',
                autoClose: false,
            })
            setenabled(true)
        })
    }

    const checkpw = (e) => {
        let pw, pw1, pw2;
        if(e.target.name === 'password1'){
            setpassword1(e.target.value);
            pw = password;
            pw1 = e.target.value;
            pw2 = password2;
        }else if(e.target.name === 'password2'){
            setpassword2(e.target.value);
            pw = password;
            pw1 = password1;
            pw2 = e.target.value;
        }else{
            setpassword(e.target.value);
            pw = e.target.value;
            pw1 = password1;
            pw2 = password2;
        }
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
        if(pw1 !== pw2){
            setwarning("Passwords don't match")
            setloginenabled(false)
        }else if(pw === pw1){
            setwarning("Use a different password")
            setloginenabled(false)
        }else if(!pw1.match(passw)){
            setwarning("Password must have between 8 and 14 characters, one uppercase letter, one number and one spetial character")
            setloginenabled(false)
        }else{
            setwarning('')
            setloginenabled(true)
        }
    }

    return(
        <div>
            <Header/>
            <section>
                <div className="c-split">
                    <div className="c-container">
                        <div className="c-input" id="login">
                            <h2 className="c-split__title">Change Password</h2>
                            <label htmlFor="password" ><strong>Old Password</strong> </label>
                            <input className="input" type="password" id="password" name="password" value={password} onChange={checkpw}/>
                            <label htmlFor="password1" ><strong>New Password</strong> </label><br/>
                            <input className="input" type="password" id="password1" name="password1" value={password1} onChange={checkpw}/>
                            <label htmlFor="password2" ><strong>Confirm Password</strong> </label><br/>
                            <input className="input" type="password" id="password2" name="password2" value={password2} onChange={checkpw}/>  
                            {loginenabled?
                            <button className="c-module__button" onClick={change_password}>Change</button>
                            :
                            <div>
                                <button className="c-module__button disabled" disabled>Change</button>
                                {loadingpassword?
                                <div className="loading-spinner"></div>
                                :
                                null
                                }
                                
                            </div>
                            
                            }
                            
                            <div className="warning">
                                {warning}
                            </div>
                        </div>
                        <div className="c-output" id="signup">
                            <h2 className="c-split__title">Your info</h2>
                            <div className="flex">
                                <div className="c-50">
                                    <label htmlFor="first" ><strong>First Name</strong> </label><br/>
                                    <input className="input" type="text" id="first" name="first" value={name} onChange={(e) => {setname(e.target.value)}}/>
                                </div>
                                <div className="c-50">
                                    <label htmlFor="last" ><strong>Last Name</strong> </label><br/>
                                    <input className="input" type="text" id="last" name="last" value={lastname} onChange={(e) => {setlastname(e.target.value)}}/>
                                </div>
                                <div className="c-50">
                                    <label htmlFor="emailr" ><strong>Email</strong> </label><br/>
                                    <input className="input" type="emailr" id="emailr" name="emailr" value={email} disabled/>
                                </div>
                                <div className="c-50">
                                    <label htmlFor="activity" ><strong>Activity</strong> </label><br/>
                                    <select className="input" type="number" id="activity" name="activity" value={role} onChange={(e) => {setrole(e.target.value)}}>
                                        <option value="Student" >Student</option>
                                        <option value="Researcher" >Researcher</option>
                                        <option value="Hobbyst" >Hobbyst</option>
                                    </select><br/>
                                </div>
                                {enabled?
                                <button className="c-module__button" onClick={update_user}>Update</button>
                                :
                                <div>
                                    <button className="c-module__button disabled" disabled>Update</button>
                                    <div className="loading-spinner"></div>
                                </div>
                                
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

export default User