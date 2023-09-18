import React, { Component } from 'react';
import { Parallax } from 'react-materialize'


class ParallaxDisplay extends Component {

    render () {
        return (
            <div className="parallaxDis">
                <div className="section white">
                    <div className="row container">
                        <h2 className="header">Caring about our planet...</h2>
                        <p className="grey-text text-darken-3 lighten-3">People are rarely aware of the environmental and social implications of the products we buy. Buy Better strives to make conscious consumerism the status quo..</p>
                    </div>
                </div>
                <Parallax imageSrc="../../../parallax2.jpeg" />
                <div className="section white">
                    <div className="row container">
                        <h2 className="header">...and the people in it.</h2>
                        <p className="grey-text text-darken-3 lighten-3">Buy the things you love while reducing your carbon footprint and making a positive impact on the lives of the people behind the product. It’s that easy. Start here. Buy Better.</p>
                    </div>
                </div>
                <Parallax imageSrc="../../../parallax1.jpg" />
            </div> 
        )
    }

}


export default ParallaxDisplay;