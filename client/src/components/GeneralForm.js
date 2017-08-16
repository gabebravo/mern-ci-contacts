import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const GeneralForm = props => (
  <div>
    <Link className='close-create-contact' to='/'>Close</Link>
    <div className='create-contact-form'>
      <div className='create-contact-details'>
        <input type='text' value={props.name} name='name' 
          placeholder='Name' onChange={props.handleName} />
        <input type='text' value={props.email} name='email' 
          placeholder='Email' onChange={props.handleEmail} />
        <button onClick={props.handleSubmit}>{props.btnText}</button>
      </div>
    </div>
  </div>
);

GeneralForm.propTypes = {
  name: PropTypes.string,
  handleName: PropTypes.func, 
  handleEmail: PropTypes.func,
  handleSubmit: PropTypes.func,
  btnText: PropTypes.string
}

export default GeneralForm;