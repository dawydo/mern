import React, { Component } from 'react';
//BrowserRouter - Looks at current route and displays needed components 
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        {/*Show Header component on all pages*/}
                        <Header />

                        {/*On main page show Landing component*/}
                        <Route path="/" exact component={Landing} />

                        {/*On surveys page show Dashboard component*/}
                        <Route path="/surveys" exact component={Dashboard} />

                        {/*On surveys/new page show SurveyNew component*/}
                        <Route path="/surveys/new" exact component={SurveyNew} />

                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions) (App);