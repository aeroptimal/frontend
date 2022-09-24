import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import info from '../components/static/img/info.png'

import './static/css/index.css'

import React, { useEffect, useState, useRef } from 'react';
import { scroller as scroll } from "react-scroll";
import socketIOClient from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const id = "ABC123"

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result)
        };
        reader.onerror = error => {
            reject(error)
        };
    })    
};

function Mesh(){
    const [loading, setloading] = useState(false)
    const [DH, setDH] = useState(20)
    const [WL, setWL] = useState(20)
    const [FLH, setFLH] = useState(0.0001)
    const [GR, setGR] = useState(1.07)
    const [MCZ, setMCZ] = useState(0.55)
    const [V, setV] = useState(30)
    const [rho, setrho] = useState(1.225)
    const [mu, setmu] = useState(0.00001789)
    const [yplus, setyplus] = useState(10)
    const [enabled, setenabled] = useState(false)
    const [enablebutton, setenablebutton] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [filename, setfilename] = useState(null);
    const [close, setclose] = useState(null);
    const [far, setfar] = useState(null);
    const [foam, setfoam] = useState(null);
    const [msh, setmsh] = useState(null);
    const [su2, setsu2] = useState(null);
    const [vtk, setvtk] = useState(null);
    const [points, setpoints] = useState(null);
    const [cells, setcells] = useState(null);
    const [cellopeness, setcellopeness] = useState(null);
    const [aspectratio, setaspectratio] = useState(null);
    const [skewness, setskewness] = useState(null);
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        
    },[]);


    const handleFileInput = async (e) => {
        if(e.target.files[0].size < 10240){
            const file = await getBase64(e.target.files[0])
            setSelectedFiles(file)
            setfilename(e.target.files[0].name);
            setenablebutton(true);
        }
    }
    
    const calculateYplus = () => {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/mesh/yplus`,{
            method: 'POST',
            body: JSON.stringify({
                V: parseFloat(V),
                rho: parseFloat(rho),
                mu: parseFloat(mu),
                yplus: parseFloat(yplus)
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error){
                if(data.DeltaS >= 0.00001 && data.DeltaS <= 0.0005){
                    setFLH(data.DeltaS)
                    scroll.scrollTo("calculate",{smooth: true})
                }else{
                    toast.error("Check your parameters for getting a valid First Layer Height",{
                        position:'top-center',
                        autoClose: 10000,
                        hideProgressBar: true
                    })  
                }
                
            }else{
                toast.error(data.error,{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
                }) 
            }
        })
        .catch(_ => {
            toast.error('Please try again later',{
                position:'top-center',
                autoClose: 10000,
                hideProgressBar: true
            })
        })
    }

    const dowloadFile = (e) => {
        let url = "";
        let filename = "";
        if(e === "foam"){
            url = "data:application/zip;base64," + foam;
            filename = "Mesh.zip";
        }
        if(e === "su2"){
            url = "data:application/zip;base64," + su2;
            filename = "su2.zip";
        }
        if(e === "msh"){
            url = "data:application/zip;base64," + msh;
            filename = "msh.zip";
        }
        if(e === "vtk"){
            url = "data:application/zip;base64," + vtk;
            filename = "vtk.zip";
        }
        
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    const calculatemesh = () => {
        setloading(true);
        setenablebutton(false);
        const data = {
            file: selectedFiles,
            DomainHeight:parseFloat(DH),
            WakeLength: parseFloat(WL),
            firstLayerHeight: parseFloat(FLH),
            growthRate: parseFloat(GR),
            MaxCellSize: parseFloat(MCZ),
            id: id
        }
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/mesh`,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    const client = socketIOClient(process.env.REACT_APP_BACKEND_HOST);
                    client.on('connect', () => {
                        console.log('Connected ' + data.id)
                    })
                    client.on(data.id, (msg) => {
                        if(msg.status){
                            setpoints(msg.params.point);
                            setcells(msg.params.cells);
                            setcellopeness(msg.params.MaxCellOpenness);
                            setaspectratio(msg.params.MaxAspectRatio);
                            setskewness(msg.params.MaxSknew);
                            setfoam(msg.files.foam);
                            setmsh(msg.files.msh);
                            setsu2(msg.files.su2);
                            setvtk(msg.files.vtk);
                            setclose('data:image/png;base64,' + msg.files.cercana);
                            setfar('data:image/png;base64,' + msg.files.lejana);
                            setenabled(true);
                            setloading(false);
                            setfilename(null);
                            scroll.scrollTo("results",{smooth: true});
                        }else{
                            toast.error('Please check your inputs and try again',{
                                position:'top-center',
                                autoClose: false,
                            })
                        }
                        client.disconnect()   
                    });
                }else{
                    setloading(false);
                    setenablebutton(true);
                    toast.error(data.error,{
                        position:'top-center',
                        autoClose: 10000,
                        hideProgressBar: true
                    }) 
                }
            })
            .catch(_ => {
                setloading(false);
                setenablebutton(true);
                toast.error('Please try again later',{
                    position:'top-center',
                    autoClose: 10000,
                    hideProgressBar: true
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
                                            Given a set of input based on desired mesh geometry and airfoil coordinates, a structured c-grid is generated automatically. In addition, different mesh quality criteria are provided in table form. Finally, mesh points are plotted, and the user can interact through the graph. The mesh is available in different formats to be used in your preferred  CFD software; examples and videos are presented below with ANSYS.
                                        </p>
                                        <p>
                                            The flat-plate boundary layer theory (White's Fluid Mechanics 7th edition, page 467) and the non-dimensional wall distance y + are employed to estimate the height of the first cell from the airfoil surface. For standard wall function or non-equilibrium wall function, y+ must be between 30 and 300 (30 as overall). For enhanced wall treatment or no special wall treatment (such as the SST turbulence model) y+ must be less than 1 (1 as overall). More about turbulence and y+ <a href="https://www.researchgate.net/profile/Panayampilly-Abdul-Samad/post/Y-plus-range-for-turbulent-models/attachment/59d6393c79197b8077996735/AS%3A400990483304449%401472614989133/download/Fluent-Intro_15.0_L07_Turbulence.pdf">Link</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="video-container">
                <iframe title="tutorial" src="https://www.youtube.com/embed/4Opu0zk7gFk"></iframe>
            </div>
            <section>
                <div className="c-split">
                    <div className="c-container" id="calculate">
                        <div className="c-input">
                            <h2 className="c-split__title">Airfoil Mesh for CFD</h2>
                            <label htmlFor="DomainHeight"><strong>Domain Height</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Type % of Chord Length (restricted to 10-30)</span></label>
                            <input className="input" type="number" id="DomainHeight" name="DomainHeight" step="0.0001" min="10" max="30" value={DH} onChange={(e) => {setDH(e.target.value)}}/>

                            <label htmlFor="WakeLength"><strong>Wake Length</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Type in % of Chord Length (restricted to 10-30)</span></label>
                            <input className="input" type="number" id="WakeLength" name="WakeLength" step="0.0001" min="10" max="30" value={WL} onChange={(e) => {setWL(e.target.value)}}/>

                            <label htmlFor="firstLayerHeight"><strong>First Layer Height</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Type in % of Chord Length (restricted to 0.00001-0.0005)</span></label>
                            <input className="input" type="number" id="firstLayerHeight" name="firstLayerHeight" step="0.000000001" min="0.00001" max="0.0005" value={FLH} onChange={(e) => {setFLH(e.target.value)}}/>

                            <label htmlFor="growthRate"><strong>Growth Rate </strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Typically 1.1-1.2 (restricted to 1.05-1.2)</span></label>
                            <input className="input" type="number" id="growthRate" name="growthRate" step="0.0001" min="1.05" max="1.2" value={GR} onChange={(e) => {setGR(e.target.value)}}/>

                            <label htmlFor="MaxCellSize"><strong>Max Cell Size</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Type in % of Chord Length (restricted to 0.4-0.8)</span></label>
                            <input className="input" type="number" id="MaxCellSize" name="MaxCellSize" step="0.0001" min="0.4" max="0.8" value={MCZ} onChange={(e) => {setMCZ(e.target.value)}}/>
                            {enablebutton ?
                            <button className="c-module__button" onClick={calculatemesh}>Calculate</button>
                            :
                            <button className="c-module__button disabled" disabled>Calculate</button>
                            }
                            <h2 className="c-split__title">Calculate First Layer Height (optional)</h2>
                            <label htmlFor="Velocity"><strong>Velocity</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use values between 0.1 and 340 m/s</span></label>
                            <input className="input" type="number" id="Velocity" name="Velocity" step="0.0001" min="10" max="30" value={V} onChange={(e) => {setV(e.target.value)}}/>

                            <label htmlFor="Density"><strong>Density</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use positive values</span></label>
                            <input className="input" type="number" id="Density" name="Density" step="0.0001" min="10" max="30" value={rho} onChange={(e) => {setrho(e.target.value)}}/>

                            <label htmlFor="DynamicViscosity"><strong>Dynamic Viscosity</strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use positive values</span></label>
                            <input className="input" type="number" id="DynamicViscosity" name="DynamicViscosity" step="0.000000001" min="0.00001" max="0.0005" value={mu} onChange={(e) => {setmu(e.target.value)}}/>

                            <label htmlFor="y+"><strong>y+ </strong><img alt="#" className="tooltip-img" src={info}/><span className="tooltip">Use positive values</span></label>
                            <input className="input" type="number" id="y+" name="y+" step="0.0001" min="1.05" max="1.2" value={yplus} onChange={(e) => {setyplus(e.target.value)}}/>
                            <button className="c-module__button" onClick={calculateYplus}>Calculate</button>
                        </div>
                        <div className="c-output">
                            <h2 className="c-split__title">Choose your file</h2>
                            <button type="submit" className="c-module__button" onClick={() => {hiddenFileInput.current.click()}}>Upload your File</button><br/>
                            {loading?
                            <div className="loading-spinner"></div>
                            :
                            null
                            }
                            <input type="file" hidden accept=".dat" ref={hiddenFileInput} onChange={handleFileInput}/>
                            {filename?
                            <p>File uploaded: {filename}</p>
                            :
                            <p>Use only .dat coordinate files</p>
                            }
                                                    
                            {enabled ?
                            <button className="c-module__button" onClick={() => dowloadFile("foam")}>Download .foam</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .foam</button>
                            }

                            {enabled ?
                            <button className="c-module__button" onClick={() => dowloadFile("msh")}>Download .msh</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .msh</button>
                            }<div className="c-spacing"></div>

                            {enabled ?
                            <button className="c-module__button" onClick={() => dowloadFile("su2")}>Download .su2</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .su2</button>
                            }
                            {enabled ?
                            <button className="c-module__button" onClick={() => dowloadFile("vtk")}>Download .vtk</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .vtk</button>
                            }
                            <div id="results">
                            {enabled ?
                                <div className="chart">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Points</th>
                                                <th>Cells</th>
                                                <th>Max Cell Openness</th>
                                                <th>Max Aspect Ratio</th>
                                                <th>Max Skewness</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{points}</td>
                                                <td>{cells}</td>
                                                <td>{cellopeness}</td>
                                                <td>{aspectratio}</td>
                                                <td>{skewness}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <img src={close} alt="#" width="100%"></img>
                                    <img src={far} alt="#" width="100%"></img>
                                </div>
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

export default Mesh