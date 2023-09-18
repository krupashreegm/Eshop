import React, { Component } from 'react';
import { Button, Container, Row, Icon, Col} from 'react-materialize'


class SearchDetails extends Component {

    constructor() {
        super()
        this.state = {
            searchIndex: 0
        }
    }

    changeItem = (index) => {
        this.setState({
            searchIndex: index
        })
    }

    componentDidMount() {
        let products = this.props.searchResults
        let params = this.props.match.params
            products.filter((item, i) => {
            if (item.ASIN[0] === params.productASIN)
                this.setState({
                    searchIndex: i
                })
            return i
        })

    }

    render() {

        let filterItem = this.props.searchResults
        let featuresArr = filterItem[this.state.searchIndex].ItemAttributes[0].Feature.map((title) => {
            return <div key={title}>
                <div>
                    <ul>
                        <li>{title}</li>
                    </ul>
                </div>
            </div>
        })
        let allImgsArr = filterItem[this.state.searchIndex].ImageSets[0].ImageSet.map((img) => {
            return <div key={img}>
                <div>
                    <div>
                        <Col s={12} m={6} l={6}><img alt='' className="otherImgs" src={img.LargeImage[0].URL[0]} /></Col>
                    </div>
                </div>
            </div>
        })

        let image = filterItem[this.state.searchIndex].ImageSets[0]
        return (
            <div className="itemDetails">
                <h2 className="itemTitle" >{filterItem[this.state.searchIndex].ItemAttributes[0].Title}</h2>
                <div className="changeBtn">
                    <Button className="changeBtn btnChild" onClick={() => { this.changeItem(this.state.searchIndex - 1) }}
                        disabled={this.state.searchIndex === 0}><Icon>keyboard_arrow_left
                        </Icon>Prev</Button>
                    <Button className="changeBtn btnChild" onClick={() => { this.changeItem(this.state.searchIndex + 1) }}
                        disabled={this.state.searchIndex === filterItem.length - 1}
                    >Next<Icon>keyboard_arrow_right</Icon></Button>
                </div>

                <div className="mainBox">
                    <div className="imgBox">
                        <img className="productImg" alt="" src={
                            filterItem[this.state.searchIndex].LargeImage === undefined ? 
                                image.ImageSet[0].LargeImage[0].URL[0] :
                                filterItem[this.state.searchIndex].LargeImage[0].URL[0]}
                        />
                    </div>
                    <div className="priceBox">
                        <h4>{filterItem[this.state.searchIndex].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0]}</h4>
                        <Button waves='light' className="addBtn" onClick={() => { this.props.addToCart(filterItem) }}>Add to Cart</Button>
                        <p className>{featuresArr}</p>
                    </div>
                </div>
                <h4 className="othersHeader">More Images</h4>
                <div>
                    <Container>
                        <Row className="imgGrid">
                            {allImgsArr}
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}




export default SearchDetails;