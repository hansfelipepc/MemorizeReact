import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component{
    render(){
        return (
            <header>
                <div className="title">ReactMEMORIZE</div>
                <div>
                    <button className="bt-restart" onClick={this.props.resetGame}>
                        Restart
                    </button>
                </div>
                <div className="title">
                    Attempts: {this.props.attemptNum}
                </div>
            </header>
        )
    }
}
