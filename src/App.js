import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "./services/authService";
import { getAllTasks, saveTask } from "./services/taskService";
import { getAllGoals, saveGoal } from "./services/goalService";
import Header from "./components/header";
import TaskTable from "./components/taskTable";
import TaskForm from "./components/taskForm";
import Login from "./components/login";
import Register from "./components/register";
import Sidebar from "./components/sidebar";
import Logout from "./components/logout";
import GoalTable from "./components/goalTable";
import GoalForm from "./components/goalForm";
import Agenda from "./components/agenda";
import Report from "./components/report";
import Settings from "./components/settings";
import "./App.css";

class App extends Component {
  state = {
    user: {},
    taskList: [],
    goalList: [],
  };

  async componentDidMount() {
    const { data: taskList } = await getAllTasks();
    const { data: goalList } = await getAllGoals();
    const user = auth.getCurrentUser();

    this.setState({
      user,
      taskList,
      goalList,
    });
  }

  handleAddTask = async (t) => {
    const taskListBackup = [...this.state.taskList];
    let taskList = [...this.state.taskList];
    const task = { ...t };

    if (!task.ownerId) task.ownerId = this.state.user._id;
    if (!task.scheduled) task.scheduled = "1969-12-31";
    if (!task.dueDate) task.dueDate = "1969-12-31";
    if (!task.hrsWorked) task["hrsWorked"] = 0;
    if (!task.hrsNeeded) task["hrsNeeded"] = 0;
    if (!task.status) task.status = "new";

    if (task._id) {
      const taskIndex = this.state.taskList.findIndex((item) => {
        return item._id === task._id;
      });

      taskList[taskIndex] = { ...task };
    } else {
      taskList.push(task);
    }

    this.setState({
      taskList,
    });

    try {
      await saveTask(task);
    } catch (ex) {
      this.setState({
        taskList: taskListBackup,
      });
      console.log(ex);
    }
  };

  handleAddGoal = async (g) => {
    const goalListBackup = [...this.state.goalList];
    let goalList = [...this.state.goalList];
    const goal = { ...g };

    if (!goal.ownerId) goal.ownerId = this.state.user._id;

    goalList.push(goal);
    this.setState({
      goalList,
    });

    try {
      console.log(goal);
      await saveGoal(goal);
    } catch (ex) {
      this.setState({
        goalList: goalListBackup,
      });
      console.log(ex);
    }
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar user={this.state.user} />

        <div className="content">
          <Header />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/agenda" exact component={Agenda} />
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
          <Route
            path="/goals"
            render={(props) => (
              <GoalTable
                {...props}
                goalList={this.state.goalList}
                handleAddGoal={this.handleAddGoal}
              />
            )}
          />
          <Route
            path="/goalForm/:id"
            render={(props) => (
              <GoalForm {...props} handleAddTask={this.handleAddGoal} />
            )}
          />
          <Route
            path="/goalForm"
            render={(props) => (
              <GoalForm {...props} handleAddGoal={this.handleAddGoal} />
            )}
            exact
          />
          <Route path="/report" component={Report} />
          <Route path="/settings" component={Settings} />

          <Route path="/logout" component={Logout} />

          <Redirect from="/" to="/agenda" />
        </div>
      </div>
    );
  }
}

export default App;
