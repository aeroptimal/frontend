import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import './static/css/index.css'

import React, { useEffect, useState, useRef } from 'react';
import { scroller as scroll } from "react-scroll";

function Mesh(){

    const [DH, setDH] = useState(20)
    const [WL, setWL] = useState(20)
    const [FLH, setFLH] = useState(0.0001)
    const [GR, setGR] = useState(1.07)
    const [MCZ, setMCZ] = useState(0.55)
    const [enabled, setenabled] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        scroll.scrollTo("about",{smooth: true})
    },[]);

    const handleFileInput = (e) => {
        if(e.target.files[0].size < 2048){
            console.log(e.target.files[0].size)
            setSelectedFiles(e.target.files)
        }
        
    }

    return(
        <div>
            <Header/>
            <section >
                <div className="c-hero">
                    <div className="c-mesh_title">
                        <h1 className="c-publications__subtitle">Description</h1>
                    </div>
                    <div className="c-mesh_title">                        
                        <div className="c-mesh_container">
                            <div  className="c-hero__container">
                                <div className="c-mesh__mask"></div>
                                <div className="c-mesh__content">
                                    <div className="c-hero__copy">
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
            <section id="about">
                <div className="c-split">
                    <div className="c-container">
                        <div className="c-input">
                            <h2 className="c-split__title">Airfoil Mesh for CFD</h2>
                            <label htmlFor="DomainHeight" data-bs-toggle="tooltip" data-bs-placement="right" title="% of Chord Length (restricted to 10-30)"><strong>Domain Height</strong> <img alt="#" src="https://img.icons8.com/material-outlined/15/000000/info.png"/></label>
                            <input type="number" id="DomainHeight" name="DomainHeight" step="0.0001" min="10" max="30" value={DH} onChange={(e) => {setDH(e.target.value)}}/>

                            <label htmlFor="WakeLength" data-bs-toggle="tooltip" data-bs-placement="right" title="% of Chord Length (restricted to 10-30)"><strong>Wake Length</strong> <img alt="#" src="https://img.icons8.com/material-outlined/15/000000/info.png"/></label>
                            <input type="number" id="WakeLength" name="WakeLength" step="0.0001" min="10" max="30" value={WL} onChange={(e) => {setWL(e.target.value)}}/>

                            <label htmlFor="firstLayerHeight" data-bs-toggle="tooltip" data-bs-placement="right" title="% of Chord Length (restricted to 0.00001-0.0005)"><strong>First Layer Height</strong> <img alt="#" src="https://img.icons8.com/material-outlined/15/000000/info.png"/></label>
                            <input type="number" id="firstLayerHeight" name="firstLayerHeight" step="0.000000001" min="0.00001" max="0.0005" value={FLH} onChange={(e) => {setFLH(e.target.value)}}/>

                            <label htmlFor="growthRate" data-bs-toggle="tooltip" data-bs-placement="right" title="Typically 1.1-1.2 (restricted to 1.05-1.2)"><strong>Growth Rate </strong> <img alt="#" src="https://img.icons8.com/material-outlined/15/000000/info.png"/></label>
                            <input type="number" id="growthRate" name="growthRate" step="0.0001" min="1.05" max="1.2" value={GR} onChange={(e) => {setGR(e.target.value)}}/>

                            <label htmlFor="MaxCellSize" data-bs-toggle="tooltip" data-bs-placement="right" title="% of Chord Length (restricted to 0.4-0.8)"><strong>MaxCellSize</strong> <img alt="#" src="https://img.icons8.com/material-outlined/15/000000/info.png"/></label>
                            <input type="number" id="MaxCellSize" name="MaxCellSize" step="0.0001" min="0.4" max="0.8" value={MCZ} onChange={(e) => {setMCZ(e.target.value)}}/>
                        </div>
                        <div className="c-output">
                            <h2 className="c-split__title">Choose your file</h2>
                            <button type="submit" className="c-module__button" onClick={() => {hiddenFileInput.current.click()}}>Upload your File</button><br/>
                            <input type="file" hidden accept=".dat" ref={hiddenFileInput} onChange={handleFileInput}/>
                            {selectedFiles?
                            <p>File uploaded: {selectedFiles[0].name}</p>
                            :
                            null
                            }
                            
                            
                            {enabled ?
                            <button className="c-module__button">Download .foam</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .foam</button>
                            }

                            {enabled ?
                            <button className="c-module__button">Download .msh</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .msh</button>
                            }<div className="c-spacing"></div>

                            {enabled ?
                            <button className="c-module__button">Download .su2</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .su2</button>
                            }
                            {enabled ?
                            <button className="c-module__button">Download .vtk</button>
                            :
                            <button className="c-module__button disabled" disabled>Download .vtk</button>
                            }
                            
                        </div>
                    </div>

                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Mesh