import React, { Component } from 'react';

class ContactInfo extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.contact.name}
        {this.props.contact.phone}
      </div>
    );
  }
}

export default ContactInfo;