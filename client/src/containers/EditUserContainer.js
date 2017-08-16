import React, { Component } from 'react';
import EditForm from '../components/GeneralForm';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from '../components/Modal';

class EditUserContianer extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      id: this.props.match.params.id,
      modalMessage: ''
    }
  }

  componentDidMount(){
    axios.get('/contact/find', {
      params: { id: this.state.id }
    })
      .then( response => {
        this.setState({ name: response.data.name, email: response.data.email });
      })
      .catch( error => {
        console.log(error.message);
      });
  }

  setName = (e) => {
    this.setState({
      name: e.target.value, 
      modalMessage: ''
    });
  }

  setEmail = (e) => {
    this.setState({
      email: e.target.value, 
      modalMessage: ''
    });
  }

  updateContactInfo = () => {
    axios.put('/contact/edit', {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email
    })
      .then( response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          modalMessage: response.data.message
        });
      })
      .catch( error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <EditForm btnText="Update Contact"
          name={this.state.name} email={this.state.email}
          handleName={this.setName} handleEmail={this.setEmail}
          handleSubmit={this.updateContactInfo}
        />
        { this.state.modalMessage.length > 0 && (
        <Modal message={this.state.modalMessage} /> )}
      </div>
    );
  }
}

EditUserContianer.propTypes ={
  id: PropTypes.string
}

export default EditUserContianer;
