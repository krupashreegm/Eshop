import React, { Component } from 'react';
import { Row, Button, Container, Icon, Col} from 'react-materialize'




class FeaturedDetails extends Component {
    constructor() {
        super()
        this.state = {
            itemIndex: 0
        }
    }

    changeItem = (index) => {
    this.setState({
        itemIndex: index
    })
}

    componentDidMount () {
        let allItems = this.props.featuredItems
        let params = this.props.match.params
        allItems.filter((item, i) => {
            if (item.ASIN[0] === params.featureASIN)
            this.setState ({
                itemIndex : i
            })
                return i 
        })

    }

    render() {

        let filterItem = this.props.featuredItems
        let featuresArr = filterItem[this.state.itemIndex].ItemAttributes[0].Feature.map((title) => {
            return <div key={title}>
                <div>
                    <ul>
                        <li>{title}</li>
                    </ul>
                </div>
            </div>
        })

        let allImgsArr = filterItem[this.state.itemIndex].ImageSets[0].ImageSet.map((img) => {
            return <div key={img}>
                <div>
                    <Col s={12} m={6} l={6}><img alt='' className="otherImgs"src={img.LargeImage[0].URL[0]}/></Col>
                </div>
            </div>
        })

        return (
            <div className="itemDetails">
                <h2 className="itemTitle" >{filterItem[this.state.itemIndex].ItemAttributes[0].Title}</h2>
                <div className="changeBtn">
                    <Button className="changeBtn btnChild" onClick={() => { this.changeItem(this.state.itemIndex - 1) }} 
                        disabled={this.state.itemIndex === 0}><Icon>keyboard_arrow_left
                        </Icon>Prev</Button>
                    <Button className="changeBtn btnChild" onClick={() => { this.changeItem(this.state.itemIndex +1) }}
                        disabled={this.state.itemIndex === this.props.featuredItems.length -1}
                    >Next<Icon>keyboard_arrow_right</Icon></Button>
                </div>
                <div className="mainBox">
                    <div className="imgBox">
                        <img className="productImg" alt="" src={
                            filterItem[this.state.itemIndex].LargeImage === undefined ?
                                filterItem[this.state.itemIndex].ImageSets[0].ImageSet[0].LargeImage[0].URL[0] :
                                filterItem[this.state.itemIndex].LargeImage[0].URL[0]
                        }
                        />
                    </div>
                     <div className="priceBox">
                        <h4>{filterItem[this.state.itemIndex].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0]}</h4>
                        <Button waves='light' className="addBtn" onClick={() => { this.props.addToCart(filterItem) }} >Add to Cart</Button>
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

export default FeaturedDetails; 