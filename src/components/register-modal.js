import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactModal
        className="register-modal"
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >
        <div className="register-modal-grid">
          <button
            className="modal-close-button"
            onClick={this.props.handleModalClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="label-and-input">
            <label for="registerName">Name</label>
            <input
              className="register-input"
              type="text"
              id="registerName"
              name="registerName"
            />
          </div>
          <div className="label-and-input">
            <label for="registerusername">Username</label>
            <input
              className="register-input"
              type="text"
              id="registerUsername"
              name="registerUsername"
            />
          </div>
          <div className="label-and-input">
            <label for="registerEmail">Email</label>
            <input
              className="register-input"
              type="email"
              id="registerEmail"
              name="registerEmail"
            />
          </div>
          <div className="label-and-input">
            <label for="registerPassword">Password</label>
            <input
              className="register-input"
              type="password"
              id="registerPassword"
              name="registerPassword"
            />
          </div>
          <div className="label-and-input">
            <label for="registerRetypePassword">Retype Password</label>
            <input
              className="register-input"
              type="email"
              id="registerRetypePassword"
              name="registerRetypePassword"
            />
          </div>
          <div className="register-input__button-wrapper">
            <input
              className="register-input__button"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </ReactModal>
    );
  }
}
