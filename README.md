# Tdplaylist

A task management web app that allows you to quickly create and track tasks with a timer. Follows the pomodoro technique to help you
focus your work in bite-sized chunks. You can review your productivity via a report dashboard that will break down how you've spent
your time. Check out the live website at [tdplaylist.xyz](http://tdplaylist.xyz/)

# Technologies

### Front-end

- [React app](https://reactjs.org/docs/create-a-new-react-app.html)
- [Bootstrap](https://getbootstrap.com/2.3.2/)
- [Chart.js](https://www.chartjs.org/)

### Back-end

- Node.js
- Express
- MongoDB
- Jest

# Worklist

- Allow user to schedule, and complete tasks on task table
- Persist agenda done column by adding it as field in db
- Make sidebar and table mobile friendly
- When timer goes to 0 should prompt user to assign time to a task and if they want to start break/skip break
- Add integration with spotify api
- Report on total time worked per task, per goal

# Existing Features

### 1. Timer

- Allow user to increment and decrement timer - range (0, 60)
- Allows user to start, pause, and reset timer
- User can add the time from timer to tasks on task list

### 2. Tasks

- Displays tasks in on the tasks page in a table
- Create task from task table or task form
- Can add time to task to track time worked
- Schedule tasks for a specific date

### 3. Goals

- Displays goals in on the goals page in a table
- Create goals from goals table or goal form
- Can associate goal to tasks, one to many relationship

### 4. Users

Registration Form

- Requires name, email and password
- Uses joi-browser to validate input
- Stores password as bycrypt hash

Login Form

- requires email and password to login
- Uses joi-browser to validate input

### 5. Reports

Four dashboard widgets

- widget 1 displays a pomodoro/tomato for every 25 minutes worked today
- widget 2 displays a breakdown of the number of hours worked today, this week, this month, this year and in total
- widget 3 displays the hours worked each day of this week
- widget 4 displays the hours worked each month of this year

# Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The steps below will describe how to install the app in your local environment.

### 1. Clone this repository to your local directory. You can fork first or directly clone.

```
git clone https://github.com/linnal86/tdplaylist.git
```

### 2. Go to the local directory and install the dependencies

```
npm install
```

### 3. Go to the [tdserver repo]() and follow the steps to install the server.

### 4. Run the client

```
npm start
```
