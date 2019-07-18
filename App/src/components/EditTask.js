import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class EditTask extends React.Component {
  state = {
    name: "",
    description: "",
    email: ""
  };

  componentDidMount() {
    const { name, description } = this.props.activeTask;
    this.setState({ name, description });
  }

  changeName = event => this.setState({ name: event.target.value });
  changeDescription = event =>
    this.setState({ description: event.target.value });
  changeEmail = event => this.setState({ email: event.target.value });

  edit = event => {
    event.preventDefault();
    const { name, description } = this.state;
    const { _id } = this.props.activeTask;
    axios
      .put(`/api/editTask/${_id}`, { name, description })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log(err.response.data));
  };

  share = event => {
    event.preventDefault();
    const { email } = this.state;
    const { _id } = this.props.activeTask;
    axios
      .put(`/api/addUserWithAccess/${_id}`, { email })
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
          id="editTask"
          style={{ width: 500, margin: "auto" }}
          onSubmit={this.edit}
        >
          <h3 className="text-center">Edit Task</h3>
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
          <button type="submit" className="btn btn-outline-success">
            Edit
          </button>
        </form>
        <form
          id="shareTaskWithUser"
          style={{ width: 500, margin: "auto" }}
          onSubmit={this.share}
        >
          <div className="form-group">
            <label htmlFor="description">Share Task with User</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.changeEmail}
            />
          </div>
          <button type="submit" className="btn btn-outline-success">
            Share
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { activeTask: state.activeTask, activeUser: state.activeUser };
};

export default connect(mapStateToProps)(EditTask);
