import React, { Component } from 'react';
import { Card, CardTitle, Row, Col, Container } from 'react-materialize'
import { Link } from 'react-router-dom'

class SearchResults extends Component {



    renderSearch = (item, i) => (
        
        <div key={i}>
            <Col className="child">
                <Link to={`/search/${this.props.keywords}/${item.ASIN}`}>
                    <Card header={<CardTitle image={item.LargeImage === undefined ? item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0] : item.LargeImage[0].URL[0]} waves='light' />}
                        title={item.ItemAttributes[0].Title}>
                        <h5>Price:{item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0]}</h5>
                    </Card>
                </Link>
            </Col>
        </div>
        
    )
   

    render() {
        console.log(this.props.searchResults)
        return (
            <Container>
                <h3>Search Results for " {this.props.keywords} "</h3>
                <Row className="masonry">
                    {this.props.searchResults.map(this.renderSearch)}
                </Row>
            </Container>
        )
    }
}


export default SearchResults; 