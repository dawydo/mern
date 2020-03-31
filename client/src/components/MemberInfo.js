import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMembers } from '../actions'
import axios from 'axios'

class MemberInfo extends Component {
    componentDidMount() { 
        this.props.fetchMembers();
    }
    
    render() {
        console.log(this.props.member)

        const member = this.props.member ? (
            <div>
                <p>{this.props.member.memberName} {this.props.member.memberSurname}</p>
                <p>{this.props.member.email}</p>
                <p>{this.props.member.dateSent}</p>
            </div>
        ) : (
            <div>Loading...</div>
        )

        return (
            <div>
                <h3>Member Info</h3>
                <p>{member} </p>
            </div>
        )
    }
}

// Take data from State from STORE 
const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.memberId;
    return {
      member: state.members.find(member => member._id === id)
    }
  }

export default connect(mapStateToProps, { fetchMembers })(MemberInfo)