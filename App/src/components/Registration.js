import React from "react";
import axios from "axios";

class Registration extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  changeName = event => this.setState({ name: event.target.value });
  changeEmail = event => this.setState({ email: event.target.value });
  changePassword = event => this.setState({ password: event.target.value });

  registration = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    axios
      .post(`/api/register`, { name, email, password })
      .then(response => {
        console.log(response.data);
        if (response.data.status) {
          this.props.history.push(`/login/:id`);
        } else {
          console.log("Пошта вже зареєстрована");
        }
      })
      .catch(err => console.log(err.response.data));
  };

  render() {
    return (
      <>
        <form
          id="registration"
          style={{ width: 500, margin: "auto" }}
          onSubmit={this.registration}
        >
          <h2 className="text-center">Registration</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={this.state.name}
              onChange={this.changeName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
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
          <button className="btn btn-outline-success">Registration</button>
        </form>
        <div />
      </>
    );
  }
}

export default Registration;
