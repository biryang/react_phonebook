import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange(e) {
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleClick() {
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    }
    console.log(this.props.test, contact.name, contact.phone);

    this.props.onCreate(contact)

    this.setState({
      name: '',
      phone: ''
    })
    this.nameInput.focus()
  }

  handleKeyPress(e) {
    //Enter 확인 이벤트
    if (e.charCode === 13) {
      this.handleClick()
    }
    //ref를 통해 포커스
    console.log(e.charCode)
  }

  render() {
    return (
      <div>
        <h2>Create Contact</h2>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            ref={(ref) => { this.nameInput = ref }}
          />
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}

ContactCreate.propTypes = {
  onCreate: PropTypes.func
}

ContactCreate.defaultProps = {
  onCreate: () => {
    console.error('onCreate not defined')
  }
}

export default ContactCreate;