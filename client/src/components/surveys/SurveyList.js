import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();

    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card darken-1 key={survey._id}">
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body} 
                        </p>

                    </div>
                    <div className="card-action">
                        <h8 style={{color: "orange", marginRight: 15}}>Yes: {survey.yes} </h8>
                        <h8 style={{color: "green"}}>No: {survey.no} </h8>

                        <p className="sentDate right" style={{margin: "auto"}}>
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )
        })
    }



    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps({ surveys }) {
    return { surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)