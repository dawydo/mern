import React, { Component } from 'react'
// connect STORE
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'


class Header extends Component {
    //Display different things for loged-in users
    renderContent() {
        switch (this.props.auth){
            case null:
                return
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                )
            default:
                return [
                    <li key="1"> <Payments /> </li>,
                    <li key="3" style={{ margin: '0 10px' }}>Credits: {this.props.auth.credits}</li>,
                    <li key="2"> <a href="/api/logout">Logout</a> </li>
                ]
        }
    }

    render() {
        //console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper black">
                    {/*If user loged in navigate to /surveys if logedout to Landing page*/}
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'}
                        className="brand-logo"
                    >
                        MERN
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
          </nav>
        )
    }
}

// Connects with Redux STORE
function mapStateToProps({ auth }){
    //Passing auth to Header as props to STORE in reducers/index.js
    return { auth }
}


export default connect(mapStateToProps)(Header);