import React, { Component } from 'react';
import ContactInfo from './ContactInfo'

class Contact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      contactData: [{
        name: 'A',
        phone: '010-0000-0001'
      }, {
        name: 'B',
        phone: '010-0000-0002'
      }, {
        name: 'C',
        phone: '010-0000-0003'
      }, {
        name: 'D',
        phone: '010-0000-0004'
      },]
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    })
  }

  render() {
    const mapToComponents = (data) => {
      data.sort()
      //filter를 통해 검색기능 구현
      data = data.filter(
        (contact) => {
          // indexOf 찾지못하면 -1 반환 찾으면 index 반환
          return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
        }
      )
      return data.map((contact, i) => {
        return (<ContactInfo contact={contact} key={i} />)
      })
    }
    return (
      <div>
        <h1>Contacts</h1>
        <input
          name='keyword'
          placeholder='Search'
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
      </div>
    );
  }
}

export default Contact;