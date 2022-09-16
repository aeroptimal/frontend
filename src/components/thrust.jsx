import Header from './header.jsx'
import Footer from './footer.jsx'
import info from '../components/static/img/info.png'

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Plot from 'react-plotly.js';

function Thrust(){
    const [p, setp] = useState(1.225);
    const [S, setS] = useState(1.5);
    const [Kv, setKv] = useState(340);
    const [Cd, setCd] = useState(0.02);
    const [V, setV] = useState(22);
    const [d, setd] = useState(12);
    const [P, setP] = useState(1);
    const [Own, setOwn] = useState(70);
    const [X, setX] = useState([]);
    const [Y, setY] = useState([]);
    const [MaxVel, setMaxVel] = useState(0);
    const [SThrust, setSThrust] = useState(0)


    const calculate = () => {
        const data = {
            p:p,
            S:S,
            Kv:Kv,
            Cd:Cd,
            V:V,
            d:d,
            P:P,
            Own:Own,
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/thrust`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    setX(data.V0)
                    setY(data.Town)
                    setMaxVel(data.MaxFlightVelocity)
                    setSThrust(data.Town[0])
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
                                            A rough estimate for a small-sized propeller's dynamic thrust is obtained for an electric propulsion set (BLDC motor). Additionally, the maximum flight speed is estimated by comparing the drag and available thrust. The change of the Cd for different flight speeds (different angle of attack is obtained for different flight speeds) is not considered. If you want to take it into account, you can iterate the module changing the Cd for every new flight speed obtained. Finally, if you are not interested in flight time, you can input any value for Wing Area and Drag Coefficient at Cruise, the Static Thrust and dynamic thrust values do not depend on it.
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
                            <h2 className="c-split__title">Static (Dynamic) Thrust</h2>
                            <label htmlFor="p" data-bs-toggle="tooltip" ><strong>Air Density [kg/m<sup>3</sup>]</strong> </label>
                            <input className="input" type="number" id="p" name="p" step="0.0001" min="0" value={p} onChange={(e) => {setp(e.target.value)}}/>
                            <label htmlFor="S" data-bs-toggle="tooltip" ><strong>Wing Area [m<sup>2</sup>]</strong> </label>
                            <input className="input" type="number" id="S" name="S" step="0.0001" min="0" value={S} onChange={(e) => {setS(e.target.value)}}/>
                            <label htmlFor="Kv" data-bs-toggle="tooltip" ><strong>Motor Constant KV [RPM/V]</strong> </label>
                            <input className="input" type="number" id="Kv" name="Kv" step="0.0001" min="0" value={Kv} onChange={(e) => {setKv(e.target.value)}}/>
                            <label htmlFor="Cd" data-bs-toggle="tooltip" ><strong>Drag Coefficient at Cruise</strong> </label>
                            <input className="input" type="number" id="Cd" name="Cd" step="0.0001" min="0" value={Cd} onChange={(e) => {setCd(e.target.value)}}/>
                            <label htmlFor="V" data-bs-toggle="tooltip" ><strong>Battery Voltage [V]</strong> </label>
                            <input className="input" type="number" id="V" name="V" step="0.0001" min="0" value={V} onChange={(e) => {setV(e.target.value)}}/>
                            <label htmlFor="d" data-bs-toggle="tooltip" ><strong>Propeller Diameter [in]</strong> </label>
                            <input className="input" type="number" id="d" name="d" step="0.0001" min="0" value={d} onChange={(e) => {setd(e.target.value)}}/>
                            <label htmlFor="P" data-bs-toggle="tooltip" ><strong>Propeller Pitch [in]</strong> </label>
                            <input className="input" type="number" id="P" name="P" step="0.0001" min="0" value={P} onChange={(e) => {setP(e.target.value)}}/>
                            <label htmlFor="Own"><strong>Throttle [%]</strong> <img alt="#" src={info}/><span className="tooltip">This custom throttle impact only the 'take-off' analysis if used</span></label>
                            <input className="input" type="number" id="Own" name="Own" step="0.0001" min="0" value={Own} onChange={(e) => {setOwn(e.target.value)}}/>
                            <button className="c-module__button" onClick={calculate}>Calculate</button>
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
                                    title: "",
                                    xaxis: {title:'Velocity [m/s]'},
                                    yaxis: {title:'Thrust [N]'}
                                }}
                                useResizeHandler={true}
                            />
                            </div>
                            <div className="c-spacing"></div><br/>
                            <div className="item">
                                <div className="description">Maximum Flight Speed [m/s]</div>
                                <div className="value">{MaxVel}</div>
                            </div>
                            <div className="item">
                                <div className="description">Static Thrust at 100% [N]</div>
                                <div className="value">{SThrust}</div>
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
export default Thrust