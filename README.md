# Task-Manager-App

<div id="top"></div>

<p align="center">
  <img width="40%"  src="https://github.com/bachar78/Task-Manager-App/blob/c2204c63704d6cdafc05894dbf35f8a1cf7567e8/frontend/src/assets/images/screen1.jpg">
  <img width="40%"  src="https://github.com/bachar78/Task-Manager-App/blob/c2204c63704d6cdafc05894dbf35f8a1cf7567e8/frontend/src/assets/images/screen3.jpg">
  <img width="40%"  src="https://github.com/bachar78/Task-Manager-App/blob/c2204c63704d6cdafc05894dbf35f8a1cf7567e8/frontend/src/assets/images/Sreen4.jpg">
  <img width="40%"  src="https://github.com/bachar78/Task-Manager-App/blob/c2204c63704d6cdafc05894dbf35f8a1cf7567e8/frontend/src/assets/images/screen5.jpg">
</p>

<p align="center">
  <img width="20%" src="https://github.com/bachar78/Task-Manager-App/blob/c2204c63704d6cdafc05894dbf35f8a1cf7567e8/frontend/src/assets/images/mobile3.jpg">
  <img width="20%" src="https://github.com/bachar78/Task-Manager-App/blob/c2204c63704d6cdafc05894dbf35f8a1cf7567e8/frontend/src/assets/images/mobile1.jpg">
  <img width="20%"  src="https://github.com/bachar78/Task-Manager-App/blob/c2204c63704d6cdafc05894dbf35f8a1cf7567e8/frontend/src/assets/images/mobile2.jpg">
</p>

# Task-Manager-App

Task-Manager-App is an application built with the MERN stack.
It is for a team who is working to finish a specific project where every member can write his own tasks and define the status, the deadline, the notes about every single task
The member can create, update , delete and browse his own tasks

## 1.Setup

### Set Environment Variables

Rename the .envexample to .env and add your [MongoDB](https://www.mongodb.com/) database URI, your JWT secret and your [Cloudinary](https://cloudinary.com/) keys

### Install backend dependencies

```bash
npm install
```

### Install client (frontend) dependencies

```bash
cd frontend
npm install
```

### Run app in development (frontend & backend)

```bash
npm run dev
```

## 2. Code structure

```
backend
    └── config
    └── controllers
    └── Middlewares
    └── models
    └── routes
    └── util
    server.js
frontend
├── public
└── src
|   └── app
|   |   └── store
|   └── assets
|   └── components
|   |   └── Privacy
|   |   |   └── AdminRoute
|   |   |   └── PrivateRoute
|   |   └── BackButton
|   |   └── Footer
|   |   └── Header
|   |   └── MemberItem
|   |   └── NoteItem
|   |   └── Spinner
|   |   └── TaskItem
|   └── features
|   |   └── auth
|   |   └── notes
|   |   └── tasks
|   └── hooks
|   └── pages
|   |   └── AdminMember
|   |   └── AdminTasks
|   |   └── Home
|   |   └── Login
|   |   └── newTask
|   |   └── Profile
|   |   └── Register
|   |   └── Task
|   |   └── Tasks
|   |   └── UpdateTAsk
|   └── App
|   └── index
```

<p align="right">(<a href="#top">back to top</a>)</p>

## 3. Further Improvements

- To create Admin profile to be able to have access to the member's tasks, to be able to edit them (change the responsibilitis for example) and add notes to the member's tasks and check there notes
