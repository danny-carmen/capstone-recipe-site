import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
//TODO get state and onChange going for all the inputs
export default class LoginModal extends Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <ReactModal
        className="login-modal"
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >
        <div className="login-modal-grid">
          <button
            className="modal-close-button"
            onClick={this.props.handleModalClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="label-and-input">
            <label for="loginEmail">Email</label>
            <input
              className="login-input"
              type="email"
              id="loginEmail"
              name="loginEmail"
            />
          </div>
          <div className="label-and-input">
            <label for="loginPassword">Password</label>
            <input
              className="login-input"
              type="password"
              id="loginPassword"
              name="loginPassword"
            />
          </div>
          <div className="login-input__button-wrapper">
            <input
              className="login-input__button"
              type="submit"
              value="Log In"
            />
            <button className="login-input__button">Register</button>
          </div>
        </div>
      </ReactModal>
    );
  }
}
