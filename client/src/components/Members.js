import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMembers } from '../actions'
import { Link } from 'react-router-dom'

class MembersList extends Component {
    componentDidMount() {
        
        this.props.fetchMembers();

    }

    renderMembers() {
        return this.props.members.map(member => {
            return (
                <div className="card key={member._id}">
                    <div className="card-content">
                        <Link to={`/members/${member._id}`}>
                            <span className="card-title">{member.memberName}</span>
                        </Link>
                        <p>
                            {member.memberSurname} 
                            
                            <div> <p>ID: {member._id}</p> </div>
                            <div> <p>User: {member._user}</p> </div>
                      
                        </p>

                    </div>
                    <div className="card-action">
                        <p className="sentDate" style={{margin: "auto"}}>
                            Sent on: {new Date(member.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )
        })
    }



    render() {
        return (
            <div>
                Members.js
                {this.renderMembers()}
              
            </div>
        )
    }
}

function mapStateToProps({ members }) {
    return { members }
}

export default connect(mapStateToProps, { fetchMembers })(MembersList)