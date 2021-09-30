import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: "",
      loginPassword: "",
      errorMessage: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    debugger;
    axios
      .post(
        "http://localhost:5000/auth/login",
        {
          username: this.state.loginEmail,
          password: this.state.loginPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.validCredentials) {
          this.setState({ loginEmail: "", loginPassword: "" });
          this.props.logInUser();
          this.props.handleModalClose();
        } else {
          this.setState({
            errorMessage: "Invalid username and password",
          });
        }
      })
      .catch((err) => console.log(err));
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
        className="login-modal"
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >
        <div className="login-modal-grid">
          <div className="title-grid">
            <div>LOGIN</div>
            <button onClick={this.props.handleModalClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="input-and-label">
            <label for="loginEmail">Username</label>
            <input
              className="login-input"
              type="text"
              id="loginEmail"
              name="loginEmail"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-and-label">
            <label for="loginPassword">Password</label>
            <input
              className="login-input"
              type="password"
              id="loginPassword"
              name="loginPassword"
              onChange={this.handleChange}
            />
          </div>
          <div className="login-error-message">{this.state.errorMessage}</div>
          <button
            onClick={this.handleSubmit}
            className="login-input__button-wrapper"
          >
            LOG IN
          </button>
        </div>
      </ReactModal>
    );
  }
}
