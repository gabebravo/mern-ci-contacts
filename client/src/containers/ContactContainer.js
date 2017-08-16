import React, { Component } from 'react';
import axios from 'axios';

import ContactList from '../components/ContactList'
import Searchbar from '../components/Searchbar'
import Modal from '../components/Modal'

class ContactContainer extends Component {
  constructor(){
    super();
    this.state = {
      contacts: null, 
      searchTerm: '', 
      modalMessage: ''
    }
  }

  componentDidMount(){
    axios.get('/contact')
      .then( response => {
        this.setState({ contacts: response.data });
      })
      .catch( error => {
        console.log(error);
      });
  }

  deleteContact = (email) => {
    axios.delete('/contact/delete', {
      params: { email: email }
    })
    .then( response => {
      this.setState({ 
        contacts: response.data.contacts, 
        modalMessage: response.data.message 
      });
    })
    .catch( error => {
      console.log(error);
    });
  }

  updateQuery = (e) => {
    this.setState({ searchTerm: e.target.value, modalMessage: '' });
  }

  filterItems = (query) => {
    let contactsArr = Array.from(this.state.contacts);
    return contactsArr.filter( contact => {
      return contact.name.toLowerCase().indexOf( query.toLowerCase() ) > -1; 
    })
  }

  render() {
    let contacts = '';
    if (this.state.searchTerm.length > 0) {
      contacts = <ContactList contacts={this.filterItems(this.state.searchTerm)} handleDelete={this.deleteContact} />
    } else if (this.state.contacts) {
      contacts = <ContactList contacts={this.state.contacts} handleDelete={this.deleteContact} />
    } 
    return (
      <div className='list-contacts'>
        <Searchbar searchValue={this.state.searchTerm} queryHandler={this.updateQuery} />
        { contacts }
        { this.state.modalMessage.length > 0 && ( 
        <Modal message={this.state.modalMessage} /> )}
      </div>
    );
  }
}

export default ContactContainer;
