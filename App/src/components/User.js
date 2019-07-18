import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class User extends React.Component {
  state = {
    activeTaskInState: {}
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { _id, email } = this.props.activeUser;
    axios
      .post(`/api/getTasks`, { _id, email })
      .then(response => {
        console.log(response.data);
        dispatch({ type: "SET_LIST_OF_TASK", tasksList: response.data });
      })
      .catch(err => console.log(err.response.data));
  }

  viewTask = event => {
    event.preventDefault();
    const { tasksList } = this.props;
    const activeTaskFromList = tasksList.find(
      task => task._id === event.target.id
    );
    this.setState({ activeTaskInState: activeTaskFromList });
  };

  addTask = event => {
    event.preventDefault();
    this.props.history.push(`/addTask/:id`);
  };

  editTask = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { tasksList } = this.props;
    const activeTaskFromList = tasksList.find(
      task => task._id === event.target.id
    );
    dispatch({ type: "SET_TASK", activeTask: activeTaskFromList });
    this.props.history.push(`/editTask/:id`);
  };

  remove = event => {
    event.preventDefault();
    const { tasksList } = this.props;
    const { dispatch } = this.props;
    const { _id, email } = this.props.activeUser;
    const taskToRemove = tasksList.find(task => task._id === event.target.id);
    axios
      .delete(`/api/deleteTask/${taskToRemove._id}`)
      .then(response => {
        console.log(response.data);
        axios
          .post(`/api/getTasks`, { _id, email })
          .then(response => {
            console.log(response.data);
            dispatch({ type: "SET_LIST_OF_TASK", tasksList: response.data });
          })
          .catch(err => console.log(err.response.data));
      })
      .catch(err => console.log(err.response.data));
  };

  render() {
    const { tasksList } = this.props;
    const { name, description } = this.state.activeTaskInState;
    return (
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <span className="navbar-text">{this.props.activeUser.name}</span>
        </nav>
        <div className="row">
          <section className="col-8">
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <button className="btn btn-outline-success" onClick={this.addTask}>
              Add Task
            </button>
          </section>
          <section className="col-4">
            <ul className="list-group">
              {tasksList.map(task => (
                <li key={task._id} className="list-group-item">
                  <button
                    className="btn btn-link m-1"
                    id={task._id}
                    onClick={this.viewTask}
                  >
                    {task.name}
                  </button>
                  <button
                    className="btn btn-outline-success m-1"
                    id={task._id}
                    onClick={this.editTask}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-success m-1"
                    id={task._id}
                    onClick={this.remove}
                  >
                    &times;
                  </button>
                  <p>{`Owner: ${task.ownerId.name}`}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { activeUser: state.activeUser, tasksList: state.tasksList };
};

export default connect(mapStateToProps)(User);
