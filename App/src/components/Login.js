import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  changeEmail = event => this.setState({ email: event.target.value });
  changePassword = event => this.setState({ password: event.target.value });

  login = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    axios
      .post(`/api/login`, { email, password })
      .then(response => {
        console.log(response.data);
        if (response.data) {
          dispatch({ type: "SET_USER", activeUser: response.data });
          history.push(`/user/:id`);
        } else {
          console.log("Ви не зареєстровані");
        }
      })
      .catch(err => console.log(err.response.data));
  };
  render() {
    return (
      <>
        <form
          id="login"
          style={{ width: 500, margin: "auto" }}
          onSubmit={this.login}
        >
          <h2 className="text-center">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={this.changeEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={this.changePassword}
            />
          </div>
          <button className="btn btn-outline-success">Login</button>
        </form>
      </>
    );
  }
}

export default connect()(Login);
