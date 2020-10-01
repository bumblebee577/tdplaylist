import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import http from "./services/httpService";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import "./App.css";
import TaskTable from "./components/taskTable";
import TaskForm from "./components/taskForm";

class App extends Component {
  state = {
    user: "1",
    taskList: [],
  };

  async componentDidMount() {
    const { data: taskList } = await http.get(
      "http://localhost:3900/api/tasks"
    );

    this.setState({
      taskList,
    });
  }

  handleAddTask = async (task) => {
    const newTask = {
      title: task.title,
      ownerId: this.state.user,

      status: task.status,
    };
    const newTaskList = [...this.state.taskList, newTask];

    this.setState({
      taskList: newTaskList,
    });

    try {
      await http.post("http://localhost:3900/api/tasks", newTask);
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar />

        <div className="content">
          <Header />
          {/* <AddTask handleAddTask={this.handleAddTask} /> */}
          {/* <TaskTable taskList={this.state.taskList} /> */}
          {/* <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/taskForm/:id" component={TaskForm} />
          <Route path="/goalForm/:id" component={GoalForm} /> */}
          <Route
            path="/tasks"
            render={() => (
              <TaskTable
                taskList={this.state.taskList}
                handleAddTask={this.handleAddTask}
              />
            )}
          />
          <Route path="/taskForm" component={TaskForm} />
          {/* <Route path="/goals" component={GoalTable} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/tasks" />
          <Redirect to="/not-found" /> */}
        </div>
      </div>
    );
  }
}

export default App;
