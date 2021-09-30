import React, { Component } from "react";

export default class AccountInfo extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      retypePassword: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="account-info-wrapper">
        <label for="username">Username:</label>
        <input
          name="username"
          id="username"
          type="text"
          onChange={this.handleChange}
        />

        <label for="email"> Email:</label>
        <input
          name="email"
          id="email"
          type="text"
          onChange={this.handleChange}
        />

        <div>Reset Password</div>

        <label for="oldPassword">Old Password:</label>
        <input
          name="oldPassword"
          type="password"
          id="oldPassword"
          onChange={this.handleChange}
        />

        <label for="newPassword">New Password:</label>
        <input
          name="newPassword"
          type="password"
          id="newPassword"
          onChange={this.handleChange}
        />

        <label for="retypePassword">Retype New Password:</label>
        <input
          name="retypePassword"
          type="password"
          id="retypePassword"
          onChange={this.handleChange}
        />

        <button onClick={this.handleSubmit}>SUBMIT CHANGES</button>
      </div>
    );
  }
}
