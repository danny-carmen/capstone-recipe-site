import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
//TODO get state and onChange going for all the inputs
export default class RegisterModal extends Component {
  constructor() {
    super();

    this.state = {
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerRetypePassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    //check if user or email is already used? or is this just done at server side?
    if (this.state.registerPassword === this.state.registerRetypePassword) {
      axios
        .post("http://localhost:5000/auth/register", {
          username: this.state.registerUsername,
          email: this.state.registerEmail,
          password: this.state.registerPassword,
        })
        .then(console.log("User Registered!"))
        .catch((err) => console.log(err));
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
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
            <label for="registerusername">Username</label>
            <input
              className="register-input"
              type="text"
              id="registerUsername"
              name="registerUsername"
              onChange={this.handleChange}
            />
          </div>
          <div className="label-and-input">
            <label for="registerEmail">Email</label>
            <input
              className="register-input"
              type="email"
              id="registerEmail"
              name="registerEmail"
              onChange={this.handleChange}
            />
          </div>
          <div className="label-and-input">
            <label for="registerPassword">Password</label>
            <input
              className="register-input"
              type="password"
              id="registerPassword"
              name="registerPassword"
              onChange={this.handleChange}
            />
          </div>
          <div className="label-and-input">
            <label for="registerRetypePassword">Retype Password</label>
            <input
              className="register-input"
              type="password"
              id="registerRetypePassword"
              name="registerRetypePassword"
              onChange={this.handleChange}
            />
          </div>
          <div className="register-input__button-wrapper">
            <input
              className="register-input__button"
              type="submit"
              value="Register"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </ReactModal>
    );
  }
}
