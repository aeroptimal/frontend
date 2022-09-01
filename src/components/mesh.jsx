import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import './static/css/index.css'

import React, { useEffect } from 'react';
import { scroller as scroll } from "react-scroll";

function Mesh(){

    useEffect(() => {
        scroll.scrollTo("about",{smooth: true})
    },[]);

    return(
        <div>
            <Header/>
            <section >
                <div className="c-hero">
                    <div className="c-mesh_title">
                        <h1 class="c-publications__subtitle">Description</h1>
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
            <section>
                <div className="c-input">
                    <h2 class="c-split__title">Airfoil Mesh for CFD</h2>
                    {/* <label for="DomainHeight" data-bs-toggle="tooltip" data-bs-placement="right" title="% of Chord Length (restricted to 10-30)"><strong>Domain Height</strong> <img src="https://img.icons8.com/material-outlined/15/000000/info.png"/></label>
                    <input type="number" id="DomainHeight" class="" name="DomainHeight" step="0.0001" min="10" max="30" value="{{DomainHeight}}" required></input> */}
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Mesh