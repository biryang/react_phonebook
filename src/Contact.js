import React, { Component } from 'react';
import ContactDetails from './ContactDetails';
import ContactInfo from './ContactInfo'
import ContactCreate from './ContactCreate';
//immutability Helper
import update from 'react-addons-update';

class Contact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedKey: -1,
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
    this.handleClick = this.handleClick.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    const contactData = localStorage.contactData;

    if (contactData) {
      this.setState({
        contactData: JSON.parse(contactData)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //DidUPdate 인자 가장 최근 state를 가지고 있음
    console.log(prevState.contactData)
    console.log(this.state.contactData)
    if (JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
      localStorage.contactData = JSON.stringify(this.state.contactData)
    }
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    })
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    })
    console.log(key, 'is selected')
  }

  handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData,
        { $push: [contact] })
    })
  }

  handleRemove() {
    //선택값이 없어도 삭제 방지
    if (this.state.selectedKey < 0)
      return
    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]]
      }),
      selectedKey: -1
    })
  }

  handleEdit(name, phone) {
    //선택값이 없어도 변경 방지
    if (this.state.selectedKey < 0)
      return
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone }
        }
      })
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
        return (<ContactInfo
          contact={contact}
          key={i}
          onClick={() => this.handleClick(i)}
        />)
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
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default Contact;