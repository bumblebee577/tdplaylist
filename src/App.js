import React, { Component } from "react";
import { Route } from "react-router-dom";
import jwtDecode  from 'jwt-decode';
import { getAllTasks, saveTask } from "./services/taskService";
import Header from "./components/header";
import TaskTable from "./components/taskTable";
import TaskForm from "./components/taskForm";
import Login from "./components/login";
import Register from "./components/register";
import Sidebar from "./components/sidebar";
import "./App.css";
import Logout from './components/logout';

class App extends Component {
  state = {
    user: {},
    taskList: [],
  };

  async componentDidMount() {
    const { data: taskList } = await getAllTasks();
    const jwt = localStorage.getItem("td_token")
    if(jwt){
      const user = jwtDecode(jwt)
      this.setState({
        user,
        taskList,
      });
    }else{

      this.setState({
        taskList,
      });

    }
    

    
  }

  handleAddTask = async (t) => {
    const task = {
      ownerId: this.state.user._id,
      ...t,
    };
    if (task.scheduled === "") task.scheduled = "1969-12-31";
    if (task.dueDate === "") task.dueDate = "1969-12-31";
    if (task.hrsWorked === "") task.hrsWorked = 0;
    if (task.hrsNeeded === "") task.hrsNeeded = 0;
    if (task.status === "") task.status = "new";
    const taskList = [...this.state.taskList, task];

    this.setState({
      taskList,
    });

    try {
      await saveTask(task);
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    console.log(this.state.user)
    return (
      <div className="wrapper">
        <Sidebar user={this.state.user}/>

        <div className="content">
          <Header />
          {/* <AddTask handleAddTask={this.handleAddTask} /> */}
          {/* <TaskTable taskList={this.state.taskList} /> */}
          {/* <Route path="/taskForm/:id" component={TaskForm} />
          <Route path="/goalForm/:id" component={GoalForm} /> */}

          
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route
            path="/tasks"
            render={(props) => (
              <TaskTable
                {...props}
                taskList={this.state.taskList}
                handleAddTask={this.handleAddTask}
              />
            )}
          />

          <Route
            path="/taskForm/:id"
            render={(props) => (
              <TaskForm {...props} handleAddTask={this.handleAddTask} />
            )}
          />

          <Route
            path="/taskForm"
            render={(props) => (
              <TaskForm {...props} handleAddTask={this.handleAddTask} />
            )}
            exact
          />

          <Route path="/logout" component={Logout} />
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
