import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class AddTask extends React.Component {
  state = {
    name: "",
    description: ""
  };

  changeName = event => this.setState({ name: event.target.value });
  changeDescription = event =>
    this.setState({ description: event.target.value });

  add = event => {
    event.preventDefault();
    const { name, description } = this.state;
    const ownerId = this.props.activeUser._id;
    axios
      .post(`/api/create`, { ownerId, name, description })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log(err.response.data));
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <span className="navbar-text">{this.props.activeUser.name}</span>
        </nav>
        <form
          id="newTask"
          style={{ width: 500, margin: "auto" }}
          onSubmit={this.add}
        >
          <h3 className="text-center">Add Task</h3>
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
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={this.state.description}
              onChange={this.changeDescription}
            />
          </div>
          <button className="btn btn-outline-success">Add</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { activeUser: state.activeUser, tasksList: state.tasksList };
};

export default connect(mapStateToProps)(AddTask);
