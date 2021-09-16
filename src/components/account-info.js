import React, { Component } from "react";

export default class AccountInfo extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      username: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      retypePassword: "",
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="account-info-wrapper">
        <div>
          <label>Username:</label>
          <input name="username" type="text" />
        </div>
        <div>
          <label>Email:</label>
          <input name="email " type="text" />
        </div>
        <div>Reset Password</div>
        <div>
          <label for="retypePassword">Old Password:</label>
          <input name="oldPassword" type="password" />
        </div>
        <div>
          <label for="newPassword">New Password:</label>
          <input name="newPassword" type="password" />
        </div>
        <div>
          <label for="retypePassword">Retype New Password:</label>
          <input name="retypePassword" type="password" />
        </div>

        <div>SUBMIT CHANGES</div>
      </div>
    );
  }
}
