import React, { Component } from 'react';
import { Icon, SideNav, SideNavItem, Badge } from 'react-materialize'
import { Link, Redirect} from "react-router-dom"


class Nav extends Component {


    render() {

        const {from} = this.props.location || "/"
        return (
            <SideNav id="slide-out" className="side-nav fixed" trigger={<Icon className="hamburger"small>menu</Icon>}>
                <form className="searchBox" onSubmit={(event) => { this.props.submitSearch(event) }}>
                    <Icon medium>search</Icon>
                    <input name="searchBox" className="searchBar" placeholder="Search"/>
                </form>
                
                {this.props.fireRedirect && (
                    <Redirect to ={from || "/search/:keywords"} />
                )}
                <div className="navLinks">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/cart">Cart<Badge newIcon>{this.props.cartQty}</Badge></Link></li>
                    <SideNavItem divider />
                    <li className="subheader">Categories</li>
                    <div className="categories">
                        <li><Link to="/products/baby">Baby</Link></li>
                        <li><Link to="/products/beauty">Beauty</Link></li>
                        <li><Link to="/products/health">Health</Link></li>
                        <li><Link to="/products/grocery">Grocery</Link></li>
                        <li><Link to="/products/kitchen">Kitchen</Link></li>
                        <li><Link to="/products/pets">Pets</Link></li>
                    </div>
                </div>
            </SideNav>
        )
    }

}







export default Nav;