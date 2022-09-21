import Header from './header.jsx'
import Footer from './footer.jsx'
import info from '../components/static/img/info.png'

import { scroller as scroll } from "react-scroll";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Plot from 'react-plotly.js';

const colors = ['red','orange', 'blue','cyan','green','darkgreen'];

function Thrust(){
    const [p, setp] = useState(1.225);
    const [S, setS] = useState(1.5);
    const [Kv, setKv] = useState(3400);
    const [Cd, setCd] = useState(0.02);
    const [V, setV] = useState(15);
    const [d, setd] = useState(12);
    const [P, setP] = useState(1);
    const [Own, setOwn] = useState(70);
    const [X, setX] = useState([]);
    const [Y, setY] = useState([]);
    const [MaxVel, setMaxVel] = useState(0);
    const [SThrust, setSThrust] = useState(0);

    const [m, setm] = useState(2);
    const [rrc, setrrc] = useState(0.012);
    const [p2, setp2] = useState(1.225);
    const [S2, setS2] = useState(1.5);
    const [Clto, setClto] = useState(1.8);
    const [Clmax, setClmax] = useState(1.9);
    const [Cd2, setCd2] = useState(0.025);
    const [T, setT] = useState(75);
    const [Ts, setTs] = useState(1);

    const [T1, setT1] = useState([]);
    const [T2, setT2] = useState([]);
    const [T3, setT3] = useState([]);
    const [T4, setT4] = useState([]);
    const [T5, setT5] = useState([]);

    const [disable, setdisable] = useState(false);
    const [xx, setxx] = useState([0]);
    const [tt, settt] = useState([0]);
    const [names, setnames] = useState([0]);

    const [submit1, setsubmit1] = useState(false);
    const [submit2, setsubmit2] = useState(false)

    const calculate = () => {
        setsubmit1(true)
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
                setsubmit1(false)
                if(!data.error){
                    setX(data.V0)
                    setY(data.Town)
                    setMaxVel(data.MaxFlightVelocity)
                    setSThrust(data.Town[0])
                    setT1(data.T1);
                    setT2(data.T2);
                    setT3(data.T3);
                    setT4(data.T4);
                    setT5(data.T5);
                    scroll.scrollTo("calculate",{smooth: true})
                }else{
                    toast.error(data.error,{
                        position:'top-center',
                        autoClose: 10000,
                        hideProgressBar: true
                    })
                    
                } 
            })
            .catch(_ => {
                setsubmit1(false)
                toast.error('Please check your inputs and try again',{
                    position:'top-center',
                    autoClose: false,
                })
            })
    }

    const calculate_to = () => {
        setsubmit2(true)
        const data = {
            mass:m,
            rrc:rrc,
            p2:p2,
            S2:S2,
            Cltakeoff:Clto,
            Clmax:Clmax,
            Cd:Cd2,
            Ts:Ts,
            Own:Own,
            T:T,
            T1:T1,
            T2:T2,
            T3:T3,
            T4:T4,
            T5:T5,
            Town:Y,
            V0:X,
        }
        console.log(data)
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/takeoff`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setsubmit2(false)
                if(!data.error){
                    console.log(data)
                    setxx(data.xx)
                    settt(data.tt)
                    setnames(data.names)
                    scroll.scrollTo("calculate_to",{smooth: true})
                }else{
                    toast.error(data.error,{
                        position:'top-center',
                        autoClose: 10000,
                        hideProgressBar: true
                    })
                    
                } 
            })
            .catch(_ => {
                setsubmit2(false)
                toast.error('Please check your inputs and try again',{
                    position:'top-center',
                    autoClose: false,
                })
            })
    }

    const set_static = () => {
        setdisable(false);
    }

    const set_dynamic = () => {
        setp2(p);
        setS2(S);
        setdisable(true);
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
                    <div className="c-container">
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
                            <label htmlFor="Own"><strong>Throttle [%]</strong> <img alt="#" className="tooltip-img" src={info}/><span className="tooltip">This custom throttle impact only the 'take-off' analysis if used</span></label>
                            <input className="input" type="number" id="Own" name="Own" step="0.0001" min="0" max="100" value={Own} onChange={(e) => {setOwn(e.target.value)}}/>
                            {!submit1?
                            <button className="c-module__button" onClick={calculate}>Calculate</button>
                            :
                            <div>
                                <button className="c-module__button" disabled>Calculate</button>
                                <div className="loading-spinner"></div>
                            </div>
                            }
                        </div>
                        <div className="c-output" id="calculate">
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
                                            Given the above dynamic thrust data (selecting Dynamic Thrust) or an already known static thrust value and other environmental and aerodynamic parameters, the module estimates the minimum required takeoff distance (lift-off) and the time it would take. The methodology employs numerical methods to simulate the takeoff assuming that the torque applied by the elevator is enough for rotating the aircraft at 1.1 Vstall. The time at which the module reports the aircraft can lift-off is not related to regulations (usually 1.2 Vstall).
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
                    <div className="c-container">
                        <div className="c-input">
                            <h2 className="c-split__title">Takeoff Analysist</h2>
                            <div className="radio">
                                <input className="input-picker" type="radio" id="static" name="Ts" value="1" onChange={() => {setTs(1);set_static()}} checked={Ts === 1 ? true : false}/>
                                <label htmlFor="static">Static Thrust</label><br/>
                                <input className="input" type="number" id="T" name="T" step="0.0001" min="0" value={T} onChange={(e) => {setT(e.target.value)}}/>
                                {MaxVel === 0?
                                <input className="input-picker" type="radio" id="dynamic" name="Ts" value="2" disabled/>
                                :
                                <input className="input-picker" type="radio" id="dynamic" name="Ts" value="2" onChange={() => {setTs(2);set_dynamic()}} checked={Ts === 2 ? true : false}/>
                                }  
                                <label className="" htmlFor="dynamic">Dynamic Thrust<img alt="#" className="tooltip-img" src={info}/><span className="tooltip">In order to enable option please run Static (Dynamic) Thrust module first</span></label>
                            </div>
                            <label htmlFor="m" data-bs-toggle="tooltip" ><strong>Aircraft mass [m]</strong> </label>
                            <input className="input" type="number" id="m" name="m" step="0.0001" min="0" value={m} onChange={(e) => {setm(e.target.value)}}/>
                            <label htmlFor="rrc" data-bs-toggle="tooltip" ><strong>Rolling Resistance Coefficient [RRC]</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Pneumatic tire on a smooth asphalt or concrete is about 0.012</span> </label>
                            <input className="input" type="number" id="rrc" name="rrc" step="0.0001" min="0" value={rrc} onChange={(e) => {setrrc(e.target.value)}}/>
                            <label htmlFor="p_2" data-bs-toggle="tooltip" ><strong>Air Density [kg/m<sup>3</sup>]</strong> </label>
                            {disable ?
                            <input className="input" type="number" id="p_2" name="p_2" step="0.0001" min="0" value={p2} disabled/>
                            :
                            <input className="input" type="number" id="p_2" name="p_2" step="0.0001" min="0" value={p2} onChange={(e) => {setp2(e.target.value)}}/>
                            }
                            <label htmlFor="S_2" data-bs-toggle="tooltip" ><strong>Wing Area [m<sup>2</sup>]</strong> </label>
                            {disable ?
                            <input className="input" type="number" id="S_2" name="S_2" step="0.0001" min="0" value={S2} disabled/>
                            :
                            <input className="input" type="number" id="S_2" name="S_2" step="0.0001" min="0" value={S2} onChange={(e) => {setS2(e.target.value)}}/>
                            }
                            <label htmlFor="Clto" data-bs-toggle="tooltip" ><strong>Cl<sub>take-off</sub></strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Lift coefficient at take-off running (includes wing incidence angle and landing gear angle with respect to the fuselage)</span> </label>
                            <input className="input" type="number" id="Clto" name="Clto" step="0.0001" min="0" value={Clto} onChange={(e) => {setClto(e.target.value)}}/>
                            <label htmlFor="Clmax" data-bs-toggle="tooltip" ><strong>Cl<sub>max</sub></strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Lift coefficient at stall</span> </label>
                            <input className="input" type="number" id="Clmax" name="Clmax" step="0.0001" min="0" value={Clmax} onChange={(e) => {setClmax(e.target.value)}}/>
                            <label htmlFor="Cd2" data-bs-toggle="tooltip" ><strong>Cd</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Drag coefficient at take-off run</span> </label>
                            <input className="input" type="number" id="Cd2" name="Cd2" step="0.0001" min="0" value={Cd2} onChange={(e) => {setCd2(e.target.value)}}/>
                            <label htmlFor="Own2"><strong>Throttle [%]</strong></label>
                            <input className="input" type="number" id="Own2" name="Own2" step="0.0001" min="0" max="100" value={Own} disabled/>
                            {!submit2?
                            <button className="c-module__button" onClick={calculate_to}>Calculate</button>
                            :
                            <div>
                                <button className="c-module__button disabled" disabled>Calculate</button>
                                <div className="loading-spinner"></div>
                            </div>
                            }
                        </div>
                        <div className="c-output" id="calculate_to">
                            <div className="figure">
                            <Plot
                                data={[
                                {
                                    x: [0,0.5*(xx.length+1)],
                                    y: [0,xx.length+1],
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: {color: 'black'},
                                    showlegend: false,
                                },
                                {
                                    x: [0.5*(xx.length+1),0.5*(xx.length+1)+5+xx[0]],
                                    y: [xx.length+1,xx.length+1],
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: {color: 'black'},
                                    showlegend: false,
                                },
                                {
                                    x: [5+xx[0],0.5*(xx.length+1)+5+xx[0]],
                                    y: [0,xx.length+1],
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: {color: 'black'},
                                    showlegend: false,
                                },
                                {
                                    x: [0,5+xx[0]],
                                    y: [0,0],
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: {color: 'black'},
                                    showlegend: false,
                                },
                                ...xx.map((x,i,xx) => (
                                    {
                                        x: [(i+1)*(0.5*(xx.length+1)/(xx.length+1)),5+xx[0]+(i+1)*(0.5*(xx.length+1)/(xx.length+1))],
                                        y: [i+1,i+1],
                                        type: 'scatter',
                                        mode: 'lines',
                                        marker: {color: 'black'},
                                        line: {dash: 'dot'},
                                        showlegend: false,
                                    }
                                )),
                                ...xx.map((x,i,xx) => (
                                    {
                                        x: [(i+1)*(0.5*(xx.length+1)/(xx.length+1)),x+(i+1)*(0.5*(xx.length+1)/(xx.length+1))],
                                        y: [i+1,i+1],
                                        type: 'scatter',
                                        mode: 'lines',
                                        marker: {color: colors[i]},
                                        line: {dash: 'dot', width: '10'},
                                        name: names[i]+'% Throtle'
                                    }
                                ))
                                ]}
                                layout={{
                                    title: "",
                                    xaxis: {title:''},
                                    yaxis: {title:''}
                                }}
                                useResizeHandler={true}
                            />
                            </div>
                            <div className="c-spacing"></div><br/>
                            {names.length === 1 ?
                            <div>
                                <div className="item">
                                    <div className="description">Takeoff Runway [m]</div>
                                    <div className="value">{xx[0]}</div>
                                </div>
                                <div className="item">
                                    <div className="description">Time [s]</div>
                                    <div className="value">{tt[0]}</div>
                                </div>
                            </div>
                            :
                            null
                            }
                            
                            {names.length >= 2 ?
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {names.map((name) => (
                                                <th>{name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Take-off Runway [m]</td>
                                            {xx.map((x) => (
                                                <td>{x}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td>Take-off Time [s]</td>
                                            {tt.map((t) => (
                                                <td>{t}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                                <p>* For empty values take-off time exceed 2 minutes</p>
                            </div>
                            :
                            null
                            }                                                    
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