import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import info from '../components/static/img/info.png'

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Plot from 'react-plotly.js';

function Battery(){
    const [k,setk] = useState(1.3);
    const [p,setp] = useState(1);
    const [t,sett] = useState(1);
    const [h,seth] = useState(10);
    const [type,settype] = useState(true);
    const [time,settime] = useState(0);
    const [capacity,setcapacity] = useState(0);
    const [current,setcurrent] = useState(0);
    const [X1,setX1] = useState([]);
    const [X2,setX2] = useState([]);
    const [Y1,setY1] = useState([]);
    const [Y2,setY2] = useState([]);
    const [enabled, setenabled] = useState(true);

    const manageT = (e) => {
        sett(parseInt(e.target.value))
    }
    const manageP = (e) => {
        setp(parseInt(e.target.value))
    }

    const calculate = () => {
        setenabled(false)
        let var1;
        let var2;
        if(p === 1){
            var1 = current;
            var2 = capacity;
        }
        if(p === 2){
            var1 = time;
            var2 = current;
        }
        if(p === 3){
            var1 = time;
            var2 = capacity;
        }
        const data = {
            calc: p,
            type: t,
            var1:var1,
            var2:var2,
            h: h,
            k: k
        }
    
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/battery`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                if(p === 1){
                    settime(data.value)
                }
                if(p === 2){
                    setcapacity(data.value)
                }
                if(p === 3){
                    setcurrent(data.value)
                }
                setX1(data.IP)
                setY1(data.CP)
                setX2(data.IP)
                setY2(data.TP)
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                }) 
            }
            setenabled(true)
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
                                    The current module estimate the battery duration for a given current and nominal capacity. The second option is to assess the battery's nominal capacity (labeled capacity) for a given time and current consumption. Finally, it can estimate the current available if you already know how long the battery should last and the nominal capacity. The estimates employ Peukerts law and ignore the temperature and aging of the battery.
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
                        <h2 className="c-split__title">Battery Calculator</h2>
                        <label htmlFor="p" data-bs-toggle="tooltip" ><strong>Parameter to calculate</strong> </label>
                        <select className="input" type="number" id="p" name="p" onChange={manageP} value={p.toString()}>
                            <option value="1" >Time</option>
                            <option value="2" >Capacity</option>
                            <option value="3" >Current</option>
                        </select><br/>
                        <label htmlFor="t" data-bs-toggle="tooltip" ><strong>Battry Type</strong> </label>
                        <select className="input" type="number" id="t" name="t" onChange={manageT} value={t.toString()}>
                            <option value="1" >Li-Po</option>
                            <option value="2" >Ni-Mh</option>
                            <option value="3" >Ni-Cd</option>
                            <option value="4" >LIFePO4</option>
                            <option value="5" >Li-Ion</option>
                            <option value="6" >Enter custom battery...</option>
                        </select><br/>

                        {t === 6?
                        <div>
                            <label htmlFor="k"><strong>K Value</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Peuker constant, use values between 1 and 1.4</span></label>
                            <input className="input" type="number" id="k" name="k" min="1" max="1.4" step="0.01" value={k} onChange={(e) => {setk(e.target.value)}}/>
                        </div>
                        :
                        null
                        }
                        <div className="radio">
                            <input className="input-picker" type="radio" id="def" name="type" value="def" checked={type} onChange={() => {settype(true);seth(10)}}/>
                            <label htmlFor="def">Default value</label><br/>
                            <input className="input-picker" type="radio" id="cus" name="type" value="cus" checked={!type} onChange={() => {settype(false)}}/>
                            <label htmlFor="cus">Custom value</label>
                        </div>
                        <label htmlFor="h"><strong>H Value</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use positive values</span></label>
                        <input className="input" type="number" id="h" name="h" step="0.01" min="0" disabled={type} value={h} onChange={(e) => {seth(e.target.value)}}/>
                        
                        {p === 1?
                        null
                        :
                        <div>
                            <label htmlFor="T"><strong>Time [hours]</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use positive values</span></label>
                            <input className="input" type="number" id="T" name="T" step="0.01" min="0" value={time} onChange={(e) => {settime(e.target.value)}}/>
                        </div>    
                        }

                        {p === 3?
                        null
                        :
                        <div>
                            <label htmlFor="I"><strong>Current [A]</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use positive values</span></label>
                            <input className="input" type="number" id="I" name="I" step="0.01" min="0" value={current} onChange={(e) => {setcurrent(e.target.value)}}/>
                        </div>    
                        }

                        {p === 2?
                        null
                        :
                        <div>
                            <label htmlFor="C"><strong>Nominal Capacity [Ah]</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use positive values</span></label>
                            <input className="input" type="number" id="C" name="C" step="0.01" min="0" value={capacity} onChange={(e) => {setcapacity(e.target.value)}}/>
                        </div>    
                        }
                        {enabled?
                        <button className="c-module__button" onClick={calculate}>Calculate</button>
                        :
                        <div>
                            <button className="c-module__button disabled">Calculate</button>
                            <div className="loading-spinner"></div>
                        </div>
                        }
                        

                    </div>
                    <div className="c-output">
                        <div className="figure">
                        <Plot
                            data={[
                            {
                                x: X1,
                                y: Y1,
                                type: 'scatter',
                                mode: 'lines',
                                marker: {color: 'black'},
                            }
                            ]}
                            layout={{
                                title: "",
                                xaxis: {title:'Current [A]'},
                                yaxis: {title:'Available Capacity [AH]'}
                            }}
                            useResizeHandler={true}
                        />
                        </div>
                        <div className="figure">
                        <Plot
                            data={[
                            {
                                x: X2,
                                y: Y2,
                                type: 'scatter',
                                mode: 'lines',
                                marker: {color: 'black'},
                            }
                            ]}
                            layout={{
                                title: "",
                                xaxis: {title:'Current [A]'},
                                yaxis: {title:'Time [H]'}
                            }}
                            useResizeHandler={true}
                        />
                        </div>
                        {p === 1?
                        <div className="item">
                            <div className="description">Time [hours]</div>
                            <div className="value">{time}</div>
                        </div>
                        :
                        null
                        }
                        
                        {p === 3?
                        <div className="item">
                            <div className="description">Current [A]</div>
                            <div className="value">{current}</div>
                        </div> 
                        :
                        null
                        }

                        {p === 2?
                        <div className="item">
                            <div className="description">Capacity [AH]</div>
                            <div className="value">{capacity}</div>
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

export default Battery