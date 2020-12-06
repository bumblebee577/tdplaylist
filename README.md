# TD Playlist

## Worklist:

- when timer goes to 0 should prompt user to assign time to a task and if they want to start break/skip break

- setting form for changing name, email, password

- add sidebar display button when screen is 600px or less

## Future Features:

- add integration with spotify api
- allow anonymous users to use the web app without creating an account
- allow users to change number of items per page (pagination)
- allow users to change color gradient of sidebar
- allow users to change default time on timer and default time for break
- add button on tasks to increment based on default time on timer
- allow users to set baseline target for hours work per week / on goals -> radar chart
- add links to the tasks so that you can jump to the task immediately

1.  ### Timer

- Allow user to increment and decrement timer - range (0, 60)
- start will begin countdown to 0
- if timer hits 0 popup will ask what task at attribute time, a new task or they can cancel.
- if started the start button will change to pause button and allow pausing
- reset button will reset the timer
- label will be disabled if timer is running. active is timer is not running.
- clicking timer will allow user to attribute time completed on timer to task

2.  ### TaskTable

- display all the tasks
- table columns: line #, title, scheduled, Hours Worked, Due Date, status, checkbox for completing
- clicking on title goes to edit task from
- should be able to increment Hours Worked by 1/4 hour
- Checking completed box should change item to completed and draw line across item
- Be able to filter tasks based on status => all, new, inprogress, onhold, completed
- be able to sort items based on columsn - title, scheduled, hours worked, due date, status
- Due date should be a badge and turn red if it's less than a week until due
- input and button to quickly add task with title and default inputs
- new task button for more detailed task additions

3. ### TaskForm

- update title,
- update hours worked {date: hour+-} => add dates
- update due date
- update scheduled
- update status,
- update hours needed
- update goal
- update label
- delete task

4. ### GoalTable

- display all the goals
- table columns: line #, title, due date, status, checkbox for complete
- clicking on title goes to edit goal from
- Checking completed box should change item to completed and draw line across item
- Be able to filter tasks based on status => all, new, inprogress, onhold, completed
- be able to sort items based on columsn - title, scheduled, hours worked, due date, status
- Due date should be a badge and turn red if it's less than a week until due

5. ### GoalForm

- update name,
- update due date
- update status,
- delete goal

6. ### Registration Form

- name, email, password

7. ### Login Form

- email and password

8. ### Reports

- analysis of total time spent on tasks
- time spent by month, week, today
- time spent based on status
- time spent based on goals

9.  ### Settings

- change name
- change email
- change password
- change default work timer time
- change default break timer time
- change sidebar color
- change header color

# React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
#tdplaylist
