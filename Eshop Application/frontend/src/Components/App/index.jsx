import React, { Component } from 'react';
import '../../Assets/css/main.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'
import { Button, Modal, Row, Input } from 'react-materialize'


import Nav from './Nav'
import Cart from './Cart'
import FeaturedItems from './FeaturedItems'
import FeaturedDetails from './FeaturedDetails'
import ProductList from './ProductList'
import ProductDetails from './ProductDetails'
import SearchResults from './SearchResults'
import SearchDetails from './SearchDetails'
import FooterDisplay from './Footer'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      products: [],
      cart: [],
      featuredItems: [],
      cartQty: 0,
      searchResults: [],
      keywords: null,
      fireRedirect: false
    }
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/featuredData`)
      .then((response) => {
        this.setState({
          featuredItems: response.data
        })
      })
    axios.get(`http://localhost:8080/cart`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          cart: response.data,
          cartQty: response.data.length
        })
      })
    console.log(this.state.cart)
  }

  searchItems = (keywords) => {
    axios.get(`http://localhost:8080/searchData?keyword=${keywords}+fair%20trade+organic`)
      .then((response) => {
        this.setState({
          searchResults: response.data,
          keywords
        })
      })

  }

  submitSearch = (event) => {
    event.preventDefault();
    let query = event.target.searchBox.value
    axios.get(`http://localhost:8080/searchData?keyword=${query}+fair%20trade+organic`)
      .then((response) => {
        this.setState({
          searchResults: response.data,
          keywords: query,
          fireRedirect: true
        })
      })
     event.target.searchBox.value = ""
  }

  refreshProducts = (category) => {
    axios.get(`http://localhost:8080/products/${category}`)
      .then((response) => {
        this.setState({
          category,
          products: response.data
        })
      })
  }


  addToCart = (item) => {
    let itemTitle = item[0].ItemAttributes[0].Title[0]
    let itemPrice = item[0].Offers[0].Offer[0].OfferListing[0].Price[0].Amount[0]
    axios.post("http://localhost:8080/cart", {
      title: itemTitle,
      price: itemPrice,
    })
      .then((response) => {
        console.log(response)
        console.log("Success!")

        axios.get(`http://localhost:8080/cart`)
          .then((response) => {
            this.setState({
              cart: response.data,
              cartQty: response.data.length
            })
          })
      })
  }


  removeItem = (cartIndex) => {
    axios.post("http://localhost:8080/clear", {
      id: cartIndex.id
    }).then((response) => {
      this.setState({
        cart: response.data,
        cartQty: response.data.length
      })
    })

  }


  render() {
    return (
      <div className="App">
        <Nav
          search={this.searchItems}
          submitSearch={this.submitSearch}
          fireRedirect={this.state.fireRedirect}
          cartQty={this.state.cartQty}
        />

        <main>
          <header className="App-header">
            <img className="bbLogo responsive-img" alt="" src="../../../bb_logo.png" />
            <Modal
              trigger={<Button className="loginBtn">Log In</Button>}>
              <h4>Enter your username and password</h4>
              <Row>
                <Input s={6} label="User Name" />
                <Input type="password" label="password" s={12} />
                <Button className="loginBtn">Submit</Button>
              </Row>
            </Modal>
          </header>

          <Switch>
            <section>
              <Route exact path='/home' render={(props) => {
                return <FeaturedItems
                  featuredItems={this.state.featuredItems}
                  {...props}
                />
              }
              } />
              <Route exact path='/home/:featureASIN' render={(props) => {
                return <FeaturedDetails
                  featuredItems={this.state.featuredItems}
                  addToCart={this.addToCart}
                  changeItem={this.changeItem}
                  thisItem={this.state.thisItem}
                  {...props}
                />
              }
              } />
              <Route exact path='/cart' render={(props) => {
                return <Cart
                  cart={this.state.cart}
                  total={this.state.total}
                  removeItem={this.removeItem}
                  {...props}
                />
              }
              } />
              <Route exact path='/products/:category' render={(props) => {
                return <ProductList
                  category={props.match.params.category}
                  refreshProducts={this.refreshProducts}
                  productList={this.state.products}
                  {...props}
                />
              }
              } />
              <Route path='/products/:category/:productASIN' render={(props) => {
                return <ProductDetails
                  productList={this.state.products}
                  addToCart={this.addToCart}
                  thisItem={this.state.thisItem}
                  changeItem={this.changeItem}
                  {...props} />
              }
              } />
              <Route exact path='/search/:keywords' render={(props) => {
                return <SearchResults
                  searchResults={this.state.searchResults}
                  keywords={this.state.keywords}
                  searchItems={this.searchItems}
                  {...props} />
              }
              } />
              <Route exact path='/search/:keywords/:productASIN' render={(props) => {
                return <SearchDetails
                  searchResults={this.state.searchResults}
                  addToCart={this.addToCart}
                  changeItem={this.changeItem}
                  thisItem={this.state.thisItem}
                  {...props} />
              }
              } />
            </section>
          </Switch>
          <FooterDisplay />
        </main>
      </div>
    );
  }
}


export default App;

