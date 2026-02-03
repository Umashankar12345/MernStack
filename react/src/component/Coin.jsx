// Coin.jsx

import React, { Component } from 'react'

class Coin extends Component {
    render() {
        return (
            <div className='Coin'>
                <img
                    style={{ width: '200px', height: '200px' }}
                    src={this.props.info.imgSrc}
                    alt={this.props.info.side}
                />
            </div>
        )
    }
}

export default Coin