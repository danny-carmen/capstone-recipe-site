import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class RegisterModal extends Component {
  constructor() {
    super();

    this.state = {
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerRetypePassword: "",
      errorMessage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.state.registerUsername === "") {
      this.setState({ errorMessage: "Please provide a username" });
      return;
    }

    if (this.state.registerEmail === "") {
      this.setState({ errorMessage: "Please provide an email" });
      return;
    }

    if (
      this.state.registerPassword !== this.state.registerRetypePassword &&
      this.state.registerPassword !== ""
    ) {
      this.setState({ errorMessage: "Passwords do not match" });
      return;
    }

    //check if user or email is already used? or is this just done at server side?
    if (this.state.registerPassword === this.state.registerRetypePassword) {
      axios
        .post("https://ddc-tastable.herokuapp.com/auth/register", {
          username: this.state.registerUsername,
          email: this.state.registerEmail,
          password: this.state.registerPassword,
        })
        .then((res) => {
          if (!res.data.isUserUnique) {
            this.setState({
              errorMessage:
                "Username is already taken. Please choose a new username.",
            });
          } else {
            this.props.openLogin();
            this.props.handleModalClose();
          }
        })
        .catch((err) => console.log(err));
    } else {
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
        onRequestClose={(e) => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >
        <div className="register-modal-grid">
          <div className="title-grid">
            <div>REGISTER</div>
            <button onClick={this.props.handleModalClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="input-and-label">
            <label for="registerusername">Username</label>
            <input
              className="register-input"
              type="text"
              id="registerUsername"
              name="registerUsername"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-and-label">
            <label for="registerEmail">Email</label>
            <input
              className="register-input"
              type="email"
              id="registerEmail"
              name="registerEmail"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-and-label">
            <label for="registerPassword">Password</label>
            <input
              className="register-input"
              type="password"
              id="registerPassword"
              name="registerPassword"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-and-label">
            <label for="registerRetypePassword">Confirm Password</label>
            <input
              className="register-input"
              type="password"
              id="registerRetypePassword"
              name="registerRetypePassword"
              onChange={this.handleChange}
            />
          </div>
          <div className="register-error-message">
            {this.state.errorMessage}
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
