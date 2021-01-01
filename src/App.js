import React, { Component } from "react";
import { Route } from "react-router-dom";

import { getAllTasks, saveTask, addTimeToTask } from "./services/taskService";
import { getAllGoals, saveGoal } from "./services/goalService";
import auth from "./services/authService";
import Agenda from "./components/Agenda";
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
// import ChangePasswordForm from "./components/ChangePasswordForm";
import Settings from "./components/Settings";

import "./App.css";
import TimerModal from "./components/TimerModal";

class App extends Component {
  state = {
    user: {},
    taskList: [],
    goalList: [],
    showTimerModal: false,
    isBreak: false,
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
    this.setState({
      showTimerModal: false,
    });
  };

  handleSetTimerBreak = (startBreak) => {
    this.setState({
      isBreak: startBreak,
    });
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar user={this.state.user} />

        <TimerModal
          showTimerModal={this.state.showTimerModal}
          handleHidTimerModal={this.handleHidTimerModal}
          taskList={this.state.taskList}
          handleAddTimeToTask={this.handleAddTimeToTask}
          handleSetTimerBreak={this.handleSetTimerBreak}
          isBreak={this.state.isBreak}
        />

        <div className="content">
          <header>
            <Timer
              handleShowTimerModal={this.handleShowTimerModal}
              isBreak={this.state.isBreak}
            />
          </header>

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route
            path="/agenda"
            exact
            render={(props) => (
              <Agenda {...props} taskList={this.state.taskList} />
            )}
          />
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
          <Route path="/settings" component={Settings} />
          <Route path="/changePw" component={ChangePasswordForm} />

          <Route path="/logout" component={Logout} />
        </div>
      </div>
    );
  }
}

export default App;
