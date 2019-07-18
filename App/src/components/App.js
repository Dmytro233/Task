import React from "react";

class App extends React.Component {

  goToRegistration = event => {
    event.preventDefault();
    this.props.history.push(`/registration/:id`);
  };

  goToLogin = event => {
    event.preventDefault();
    this.props.history.push(`/login/:id`);
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <button
            type="button"
            className="btn btn-outline-success m-1"
            onClick={this.goToRegistration}
          >
            Registration
          </button>
          <button
            type="button"
            className="btn btn-outline-success m-1"
            onClick={this.goToLogin}
          >
            Login
          </button>
        </nav>
        <div>
          <h1 className="text-center m-5">Welcome to our application</h1>
        </div>
      </>
    );
  }
}

export default App;
