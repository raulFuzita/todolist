# Todolist

<br>

To-Do List is a web application to record your daily tasks to increase productivity in your day-to-day.<br>
Create an account and be able to access all your tasks whenever you want wherever you are.<br>
To-Do List supports REST API to integrate with other platforms.<br>

<br>

![An image showing an example of the Application](/public/assets/img/github_images/todo_example.png)

<br>

### Features

<br>

- Easy to setup
- Sessions are encrypted
- Form validation in both sides, client and server
- Form inputs are purified in both sides, client and server
- Form filling feedback
- Prevent CSRF attack
- Supprts MongoDB local or external
- Supports REST API
- API access is protected by token
- Supports profile picture

<br>

## How To Get Started

<br>

First clone this repository, then type `npm install` to install all dependencies.

Now you have all the necessary dependencies to run this project. Next step is to rename the
**.env.example** file to **.env**

In the section **MongoDB Connextion** there are two examples that show how to 
configure a MongoDB connector. If you have MongoDB installed locally use the first option.
You have a local MongoDB connection you have to create a database first. In the .env.example file
the database name is todolist, but you can give any name.

However, if you have a MongoDB running externally you have to read the provider instruction.
Our second option is an example for Atlas MongoDB. You can create an account for Atlas MongoDB
at this link: [Atlas MongoDB](https://account.mongodb.com/account/login)

<br>

![An image showing the env file content](/public/assets/img/github_images/env_file.png)

<br>

### Standard Settings Without .Env File

<br>

| Variables       | Values                             |
|-----------------|------------------------------------|
| HOST_NAME       | 0.0.0.0                            |
| SERVER_PORT     | 3000                               |
| PASSWORD_SECRET | encryption_secret                  |
| SESSION_SECRET  | encryption_secret                  |
| DB_HOST         | mongodb://localhost:27017/todolist |
| API_SECRET      | token_secret                       |
| MAIL_HOST       | smtp.mailtrap.io                   |
| MAIL_USERNAME   | null                               |
| MAIL_PASSWORD   | null                               |
| MAIL_ENCRYPTION | null                               |

<br>

### Custom Settings

<br>

You can customize your settings such as hostname, port, and all secret words for encryptions.
We highly recommend you change all secret words for safety.

<br>

### Run Application

<br>

You can run the project by typing in the terminal `node app.js` or just `node app`. This project supports **nodemon**, as well.<br>
You can run **nodemon** as follow `nodemon app` or just `nodemon`.<br>
The command `npm start`also works since it is configured in the **package.json** file. If you run this project
locally on a Windows machine the command `npm start` might not work. Windows has some issues to run **nodemon**.

<br>

### Documentation

<br>

This project supports API to access the application externally. If you want more information on how to use
the API you can read the [DOCUMENTATION.md](/DOCUMENTATION.md) file or in the application itself by clicking on Documentation.

<br>

![An image showing how to access the documentation](/public/assets/img/github_images/access_documentation.png)

<br>