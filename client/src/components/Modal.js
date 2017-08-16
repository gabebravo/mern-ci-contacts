import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

class Modal extends Component {

  constructor(props){
    super(props);
    this.state = {
      toggle: true, 
      message: props.message
    }
  }

  componentWillReceiveProps() {
    this.setState({
      toggle: !this.state.toggle 
    });
  }

// USED REACT ROUTER withRouter FOR PROGRAMTIC REDIRECT
  componentDidUpdate() {
    if(window.location.pathname !== "/"){
      this.props.history.push("/");
    }
  }

  toggleModal = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render() {
    const toggleState = this.state.toggle ? 'active' : 'close';
    return (
      <div className="modal-pop">
      <div className={`modal modal--${toggleState}`}>
        <div className="modal__content">
          <i className="icon icon-cross"></i>
          <h3 className="modal__title">User Feedback</h3>
          <p className="modal__text">{this.state.message}</p>
          <button className="close-modal btn btn-primary"
            onClick={this.toggleModal}>Continue</button>
        </div>
      </div>
      <div className="modal__overlay"></div>
    </div>
    );
  }
}

Modal.propTypes = {
  message: PropTypes.string
}

export default withRouter(Modal);