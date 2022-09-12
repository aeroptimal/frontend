import { useState } from 'react';
import { useSearchParams  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Reset(){
    const[password1, setpassword1] = useState("")
    const[password2, setpassword2] = useState("")
    const[loginenabled, setloginenabled] = useState(false)
    const[warning, setwarning] = useState("")
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') ?? null;
    if(token){
        sessionStorage.setItem('token',token)
    } 
    
    const change_password = () => {
        setloginenabled(false)
        const data = {
            password: password1
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/password/restore`,{
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
                sessionStorage.removeItem('token')
                window.location = '/#changes'
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                })
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

    const checkpw = (e) => {
        let pw1, pw2;
        if(e.target.name === 'password1'){
            setpassword1(e.target.value);
            pw1 = e.target.value;
            pw2 = password2;
        }else{
            setpassword2(e.target.value);
            pw1 = password1;
            pw2 = e.target.value;
        }
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
        if(pw1 !== pw2){
            setwarning("Passwords don't match")
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
            <section>
                <div className="c-split">
                    <div className="c-container">
                        <div className="c-input" id="login">
                            <h2 className="c-split__title">Restore Password</h2>
                            <label htmlFor="password1" ><strong>New Password</strong> </label><br/>
                            <input className="input" type="password" id="password1" name="password1" value={password1} onChange={checkpw}/>
                            <label htmlFor="password2" ><strong>Confirm Password</strong> </label><br/>
                            <input className="input" type="password" id="password2" name="password2" value={password2} onChange={checkpw}/>  
                            {loginenabled?
                            <button className="c-module__button" onClick={change_password}>Change</button>
                            :
                            <button className="c-module__button disabled" disabled>Change</button>
                            }
                            
                            <div className="warning">
                                {warning}
                            </div>
                        </div>
                        
                    </div>
    
                </div>
            </section>
            <ToastContainer/>
        </div>
        )
}

export default Reset