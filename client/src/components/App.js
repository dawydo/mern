import React, { Component } from 'react';
//BrowserRouter - Looks at current route and displays needed components 
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import Members from './Members'
import MemberInfo from './MemberInfo'


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchMemberInfo()
       
    }

    render() {
        return (
            <BrowserRouter>
               
                <div>
                    {/*Show Header component on all pages*/}
                    <Header />
                    <div className="container">
                    {/*On main page show Landing component*/}
                    <Route path="/" exact component={Landing} />

                    {/*On surveys page show Dashboard component*/}
                    <Route path="/surveys" exact component={Dashboard} />

                    {/*On surveys/new page show SurveyNew component*/}
                    <Route path="/surveys/new" exact component={SurveyNew} />

                    {/*On surveys/new page show SurveyNew component*/}
                    <Route path="/members" exact component={Members} />

                    {/*On surveys/new page show SurveyNew component*/}
                    <Route path="/members/:memberId"  component={MemberInfo} />

                    </div>
                </div>
               
            </BrowserRouter>
    )
    }
}
console.log()
export default connect(null, actions) (App);