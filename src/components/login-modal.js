import React, { Component } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
//TODO get state and onChange going for all the inputs
export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: "",
      loginPassword: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    //check if user or email is already used? or is this just done at server side?

    console.log(this.state.loginEmail, this.state.loginPassword);
    axios
      .post(
        "http://localhost:5000/auth/login",
        {
          username: this.state.loginEmail,
          password: this.state.loginPassword,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({ loginEmail: "", loginPassword: "" });
        this.props.handleModalClose();

        this.props.logInUser();
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
          <button
            className="modal-close-button"
            onClick={this.props.handleModalClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="label-and-input">
            <label for="loginEmail">Username</label>
            <input
              className="login-input"
              type="text"
              id="loginEmail"
              name="loginEmail"
              onChange={this.handleChange}
            />
          </div>
          <div className="label-and-input">
            <label for="loginPassword">Password</label>
            <input
              className="login-input"
              type="password"
              id="loginPassword"
              name="loginPassword"
              onChange={this.handleChange}
            />
          </div>
          <div className="login-input__button-wrapper">
            <input
              className="login-input__button"
              type="submit"
              value="Log In"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </ReactModal>
    );
  }
}
