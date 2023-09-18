import React, { Component } from 'react';
import { Footer } from 'react-materialize'
 

class FooterDisplay extends Component {

    render() {
        return (
            <div>
                <Footer copyrights="&copy 2015 Copyright Text"
                    links={
                        <ul>
                            <li><a className="grey-text text-lighten-3" href="#!"><i class="fab fa-facebook-square fa-lg"></i></a></li>
                            <li><a className="grey-text text-lighten-3" href="#!"><i class="fab fa-instagram fa-lg"></i></a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">info@buybetter.com</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">604-123-4567</a></li>
                        </ul>
                    }
                    className='example'
                >
                    <h5 className="white-text">Contact Us</h5>
                    <p className="grey-text text-lighten-4">Thank you for visiting our site, stay in touch!</p>
                </Footer>
                
            </div>
        )
    }

}


export default FooterDisplay;