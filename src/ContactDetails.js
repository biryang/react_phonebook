import React, { Component } from 'react';

class ContactDetails extends Component {
  render() {

    const details = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    )
    const blank = (<div>Not Selected</div>)
    return (
      <div>
        <h2>Details</h2>
        {/* Contact에서 전달 받은 props 확인*/}
        {this.props.isSelected ? details : blank}
      </div>
    );
  }
}

// props 기본값
ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: ''
  }
}

export default ContactDetails;