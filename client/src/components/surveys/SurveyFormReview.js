import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux'
import formFields from './formFields' 
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })

    return (
        <div>
            <h5>Please confirm your entries</h5>
            
            {reviewFields}

            <button className="yellow darken-3 btn-flat" onClick={ onCancel }>
                Back
            </button>

            <button className="green darken-3 btn-flat white-text right" 
            onClick={ () => submitSurvey(formValues, history) }>
                Send Survey
                <i className="material-icons white-text right">send</i>
            </button>

        </div>
    )
}

function mapStateToProps(state) {
    // console.log(state)
    return { formValues: state.form.surveyForm.values }
}


export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))