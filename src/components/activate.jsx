import { useEffect } from 'react';
import { useSearchParams  } from 'react-router-dom';

function Activate(){
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const token = searchParams.get('id') ?? null;
        if(token){
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/activate`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    window.location = '/#notactive'
                }else{
                    window.location = '/#active'
                }
            })
            .catch(_ => {
                window.location = '/#notactive'
            })
        }
    },[searchParams])
    return(
        <div className="centered">
            <div className="spinner"></div>
        </div>
    )
}

export default Activate