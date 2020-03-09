// SurveyForm shows a form for a user to add input
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields' 


class SurveyForm extends Component {
    rederFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name} />
            )
        })
    }


    render() {
        return(
            <div className="container">
                SurveyForm!
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>

                    {this.rederFields()}

                    <Link to="/surveys" className="red btn-flat white-text" >
                        Cancel
                    </Link>

                    <button type="submit" className="green btn-flat right white-text">
                        Next
                        <i className="material-icons right">chevron_right</i>
                    </button>
                </form>
            </div>
        )
    }
}


function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });


    return errors;
}


export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);