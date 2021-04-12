import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { getAllTasks, saveTask, addTimeToTask } from "./services/taskService";
import { getAllGoals, saveGoal } from "./services/goalService";
import auth from "./services/authService";
import FrontPage from "./components/FrontPage";
import Report from "./components/Report";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import Logout from "./components/Logout";
import GoalTable from "./components/GoalTable";
import GoalForm from "./components/GoalForm";
import Timer from "./components/Timer";

import "./App.css";
import TimerModal from "./components/TimerModal";

const MINS = 25;
const SECS_PER_MIN = 60;

class App extends Component {
  state = {
    user: {},
    taskList: [],
    goalList: [],
    showTimerModal: false,
    isBreak: false,
    setTime: MINS * SECS_PER_MIN,
    timerTime: MINS * SECS_PER_MIN,
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      const { data: taskList } = await getAllTasks(user._id);
      const { data: goalList } = await getAllGoals(user._id);

      this.setState({
        user,
        taskList,
        goalList,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const user = auth.getCurrentUser();

    if (user && prevState.taskList.length < this.state.taskList.length) {
      const { data: taskList } = await getAllTasks(user._id);
      this.setState({
        taskList,
      });
    }

    if (user && prevState.goalList.length < this.state.goalList.length) {
      const { data: goalList } = await getAllGoals(user._id);
      this.setState({
        goalList,
      });
    }
  }

  handleAddTimeToTask = async (tObj) => {
    const taskListBackup = [...this.state.taskList];

    let taskList = [...this.state.taskList];
    const taskIndex = this.state.taskList.findIndex((item) => {
      return item._id === tObj.id;
    });

    const task = { ...taskList[taskIndex] };
    task["minsWorked"] = tObj.minsWorked;
    taskList[taskIndex] = task;
    this.setState({
      taskList,
    });

    try {
      await addTimeToTask(tObj);
    } catch (ex) {
      this.setState({
        taskList: taskListBackup,
      });
      console.log(ex);
    }
  };

  handleAddTask = async (t) => {
    const taskListBackup = [...this.state.taskList];
    let taskList = [...this.state.taskList];
    const task = { ...t };
    if (!task.ownerId) task.ownerId = this.state.user._id;

    if (task._id && task._id !== "") {
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
    if (!goal.dueDate) goal.dueDate = "1969-12-31";

    if (goal._id && goal._id !== "") {
      const goalIndex = this.state.goalList.findIndex((item) => {
        return item._id === goal._id;
      });

      goalList[goalIndex] = { ...goal };
    } else {
      goalList.push(goal);
    }

    this.setState({
      goalList,
    });

    try {
      await saveGoal(goal);
    } catch (ex) {
      this.setState({
        goalList: goalListBackup,
      });
      console.log(ex);
    }
  };

  handleShowTimerModal = () => {
    this.setState({
      showTimerModal: true,
    });
  };

  handleHidTimerModal = () => {
    if (this.state.timerTime === 0) {
      let setTime = MINS * SECS_PER_MIN;
      let timerTime = MINS * SECS_PER_MIN;
      this.setState({
        setTime,
        timerTime,
      });
    }
    this.setState({
      showTimerModal: false,
    });
  };

  handleSetTimerBreak = (startBreak) => {
    this.setState({
      isBreak: startBreak,
    });
  };

  handleCountTime = (t) => {
    if (t === 0) {
      this.setState({
        showTimerModal: true,
      });
    }

    this.setState({
      timerTime: t,
    });
  };

  handleSetTime = (t) => {
    this.setState({
      setTime: t,
    });
  };

  handleEntry = async () => {
    window.sessionStorage.setItem("newVisitor", "false");
    window.location.reload();
  };

  render() {
    return (
      <>
        {sessionStorage.getItem("newVisitor") !== "false" ? (
          <FrontPage handleEntry={this.handleEntry} />
        ) : (
          <div className="wrapper">
            <Sidebar user={this.state.user} />

            <TimerModal
              showTimerModal={this.state.showTimerModal}
              taskList={this.state.taskList}
              timerTime={this.state.timerTime}
              setTime={this.state.setTime}
              isBreak={this.state.isBreak}
              handleHidTimerModal={this.handleHidTimerModal}
              handleAddTimeToTask={this.handleAddTimeToTask}
              handleSetTimerBreak={this.handleSetTimerBreak}
            />

            <div className="content">
              <header>
                <Timer
                  timerTime={this.state.timerTime}
                  setTime={this.state.setTime}
                  isBreak={this.state.isBreak}
                  handleShowTimerModal={this.handleShowTimerModal}
                  handleSetTime={this.handleSetTime}
                  handleCountTime={this.handleCountTime}
                />
              </header>

              {this.state.user._id ? (
                <Redirect from="/" to="/tasks" />
              ) : (
                <Redirect from="/" to="/register" />
              )}

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
                path="/taskForm/:ownerId/:id"
                render={(props) => (
                  <TaskForm
                    {...props}
                    handleAddTask={this.handleAddTask}
                    goalList={this.state.goalList}
                  />
                )}
              />
              <Route
                path="/taskForm"
                render={(props) => (
                  <TaskForm
                    {...props}
                    handleAddTask={this.handleAddTask}
                    goalList={this.state.goalList}
                  />
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
                path="/goalForm/:ownerId/:id"
                render={(props) => (
                  <GoalForm {...props} handleAddGoal={this.handleAddGoal} />
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

              <Route path="/logout" component={Logout} />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;
