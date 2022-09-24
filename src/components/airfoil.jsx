import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import info from '../components/static/img/info.png'

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Plot from 'react-plotly.js';

function Airfoil(){

    const [cl, setcl] = useState(1.8);
    const [re, setre] = useState(500000);
    const [xf, setxf] = useState(1);
    const [title, settitle] = useState("")
    const [n, setn] = useState(200);
    const [X, setX] = useState([]);
    const [Y, setY] = useState([]);
    const [enabled, setenabled] = useState(false);
    const [submit, setsubmit] = useState(true);
    const [t, sett] = useState(0);
    const [m, setm] = useState(0);
    const [p, setp] = useState(0);
    const [a, seta] = useState(0);
    const [e, sete] = useState(0);
    const [dat,setdat] = useState("");
    const [csv,setcsv] = useState("");

    const calculate = () => {
        setsubmit(false);
        const data = {
            cl: parseFloat(cl),
            Re: parseInt(re),
            xf: parseInt(xf),
            n: parseInt(n)
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/airfoil`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    setX(data.x);
                    setY(data.y);
                    settitle(data.filename);
                    sett(data.t);
                    setm(data.m);
                    setp(data.p);
                    seta(data.a);
                    sete(data.e);
                    setdat(data.dat);
                    setcsv(data.csv)
                    setenabled(true);

                }else{
                    toast.error(data.error,{
                        position:'top-center',
                        autoClose: 10000,
                        hideProgressBar: true
                    })
                    
                }
                setsubmit(true); 
            })
            .catch(_ => {
                toast.error('Please check your inputs and try again',{
                    position:'top-center',
                    autoClose: false,
                })
                setsubmit(true);
            })
    }

    const dowloadFile = (e) => {
        let url = "";
        let filename = "";
        if(e === "dat"){
            url = "data:application/csv;base64," + dat;
            filename = "airfoil.dat";
        }
        if(e === "csv"){
            url = "data:application/csv;base64," + csv;
            filename = "airfoil.csv";
        }
        
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return(
        <div>
            <Header/>
            <section >
                <div className="c-hero">
                    <div className="c-mesh_title">                        
                        <div className="c-mesh_container">
                            <div  className="c-hero__container">
                                <div className="c-mesh__mask"></div>
                                <div className="c-mesh__content">
                                    <div className="c-hero__copy">
                                        <h1 className="c-publications__subtitle">Description</h1>
                                        <p>
                                            The current module employs the methodology developed to generate a 1 meter of chord airfoil with minimum drag given a target lift coefficient and a Reynolds condition. The design space was created for lift coefficients between 0.2 and 1.8, and Reynolds number between 80.000 and 500.000. If a higher Reynolds number is required, the best approach is to employ the maximum Reynolds available (500.000) and use this airfoil and similarly for Reynolds lower than 80.000. Additionally, the optimum airfoil is searched roughly between an angle of attack between -2° and 8° (expecting linear region), a maximum thickness between 8% and 16% of the chord, a maximum camber between 0% and 9% of the chord, and maximum camber position between 40% and 55% of the chord. Furthermore, the airfoil design space is given by the NACA-4 digits parameterization, which restricts reflex airfoils. Finally, the optimal airfoil shape is granted by the algorithm, while the angle of attack and the aerodynamic efficiency are estimations. The recommended methodology is CFD, but both (XFOIL and CFD) methodologies are available for further comparison by the user.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="c-split">
                    <div className="c-container" id="calculate">
                        <div className="c-input">
                            <h2 className="c-split__title">Airfoil Calculator</h2>
                            <label htmlFor="cl" ><strong>Lift Coefficient</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use values between 0.2 and 1.8</span></label>
                            <input className="input" type="number" id="cl" name="cl" step="0.01" min="0.2" max="1.8" value={cl} onChange={(e) => {setcl(e.target.value)}}/>
                            <label htmlFor="re" ><strong>Reynolds Number</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use values between 80000 and 500000</span></label>
                            <input className="input" type="number" id="re" name="re" step="4" min="80000" max="500000" value={re} onChange={(e) => {setre(e.target.value)}}/>
                            <label ><strong>Select your Methodology</strong></label>
                            <div className="radio">
                                <input className="input-picker" type="radio" id="xfoil" name="xf" value="HTML" onChange={() => {setxf(1)}} checked={xf === 1 ? true : false}/>
                                <label htmlFor="xfoil">XFOIL</label><br/>
                                <input className="input-picker" type="radio" id="cfd" name="xf" value="CSS" onChange={() => {setxf(2)}} checked={xf === 2 ? true : false}/>
                                <label htmlFor="cfd">CFD</label>
                            </div>
                            <label htmlFor="n"><strong>Number of points</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use values between 50 and 500</span></label>
                            <input className="input" type="number" id="n" name="n" step="1" min="50" max="500" value={n} onChange={(e) => {setn(e.target.value)}}/>
                            
                            {submit?
                            <button className="c-module__button" onClick={calculate}>Calculate</button>
                            :
                            <div>
                                <button className="c-module__button" onClick={calculate}>Calculate</button>
                                <div className="loading-spinner"></div>
                            </div>
                            }
                            

                        </div>
                        <div className="c-output">
                            <div className="figure">
                            <Plot
                                data={[
                                {
                                    x: X,
                                    y: Y,
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: {color: 'black'},
                                }
                                ]}
                                layout={{
                                    title: title,
                                    yaxis: {
                                        scaleanchor: 'x',
                                        scaleratio: 1
                                    }
                                }}
                                useResizeHandler={true}
                            />
                            </div>
                            {enabled ?
                            <button className="c-module__button" onClick={() => dowloadFile("csv")}>Download .csv</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .csv</button>
                            }

                            {enabled ?
                            <button className="c-module__button" onClick={() => dowloadFile("dat")}>Download .dat</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .dat</button>
                            }<div className="c-spacing"></div><br/>
                            <div className="item">
                                <div className="description">Maximum Thickness</div>
                                <div className="value">{t}</div>
                            </div>
                            <div className="item">
                                <div className="description">Maximum Camber</div>
                                <div className="value">{m}</div>
                            </div>
                            <div className="item">
                                <div className="description">Maximum Camber Position</div>
                                <div className="value">{p}</div>
                            </div>
                            <div className="item">
                                <div className="description">* Estimated Angle Of Attack (º)</div>
                                <div className="value">{a}</div>
                            </div> 
                            <div className="item">
                                <div className="description">* Estimated Aerodynamic Efficiency (%)</div>
                                <div className="value">{e}</div>
                            </div><br/>
                            <div className="item">
                                *: Only use these values of angle of attack and efficiency if it is not possible for you to calculate or meassure them by another metodology    
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
export default Airfoil