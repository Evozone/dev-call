# <table><tr><td>![Logo](./client/public/assets/icons/maskable_icon_x48.png)</td><td> Dev Chat +</td></tr></table>

**Dev Chat+** is a [Web2 Application](https://ethereum.org/en/developers/docs/web2-vs-web3/) specifically designed to cater to the needs of professional users such as *software developers, designers, and project managers*. The application aims to provide a comprehensive platform for collaboration and communication among professionals working on various projects.

<sup>Dev Chat+ was a web application developed as a Mini Project for Semesters 5 and 6 of Year 3 in Computer Engineering.</sup> 

<details>
  <summary>List of Contents</summary>
  
- [ Dev Chat +](#-dev-chat-)
  - [Features](#features)
    - [Base Features](#base-features)
      - [Chat](#chat)
      - [Meet](#meet)
    - [Workspaces](#workspaces)
      - [Code](#code)
      - [Call](#call)
      - [Draw](#draw)
  - [Installation](#installation)
      - [Server](#server)
      - [Client](#client)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Attribution](#attribution)
  - [Contributing](#contributing)
  - [Project Maintainers](#project-maintainers)
  
</details>

---

## Features

### Base Features

#### Chat
- Real-time text-based communication
- Sharing of files, images, and rich code snippets
- Support for markdown with syntax highlighting
- Protection against XSS attacks

#### Meet 
- Integrated video conferencing capabilities
- Scheduling and joining of meetings
- Screen sharing and real-time discussions

### Workspaces

Workspaces are tools for collaborating on projects. Each workspace has its own call, code, and draw features. Users can create multiple workspaces and invite others to collaborate. Workspaces are saved to the cloud, allowing access from any device.

#### Code
- Built-in code editor with syntax highlighting and autocompletion
- Compiler/interpreter for various languages
- Run code and view output without leaving the application

#### Call
- Real-time audio communication with WebSockets

#### Draw
- Collaborative whiteboard for drawing and diagramming
- Real-time updates and multiple users can draw simultaneously
- Export drawings as images or PDFs

---

## Installation

- This project was built with `create-react-app`, so you'll need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine to run it.
- Check out [How to Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for instructions on how to install them.
- Once you have those installed, you can follow these steps to get the project up and running:

  1. Clone this repository to your local machine. [Cloning a repository ↗️](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
  2. Navigate to the project directory in your terminal. [Navigating the command line ↗️](https://www.digitalcitizen.life/command-prompt-how-use-basic-commands/)

- Note that you will also need to obtain the [environment variables](https://kinsta.com/knowledgebase/what-is-an-environment-variable/) for the server and client in order to run the project. To do this, please contact one of the project maintainers listed below.
- Add the environment variables to a `.env` file in the server and client directories. The file structure should look like this:

```
dev-call
├── client
│   ├── .env
│   ├── package.json
│   └── ...
├── server
│   ├── .env
│   ├── package.json
│   └── ...
└── ...
```

#### Server

1. Navigate to the `server` directory.
2. Run `npm install` to install the project's dependencies. 
3. Run `npm run dev` to start the development server.

#### Client

1. In a separate terminal, navigate to the `client` directory.
2. Run `npm install` to install the project's dependencies.
3. Run `npm run start` to start the development server.

---

## Usage

Once you have the project running, you can access it by navigating to `http://localhost:3000` in your web browser. From there, you can use the chat, meet, and workspace features to collaborate with others on your projects. 

**If you are using *Brave Browser*, you may need to disable the built-in shields in order to use the Google Login services. To do this, click on the Brave icon in the top-right corner of the browser and toggle the shields off.**

If you encounter any issues or have any questions, please don't hesitate to reach out to the project maintainers listed below.

---

## Technologies Used 

|          |                                                                   Technologies                                                                    |
| -------- | :-----------------------------------------------------------------------------------------------------------------------------------------------: |
| Frontend | [React](https://reactjs.org/), [Material-UI](https://material-ui.com/), [Firebase](https://firebase.google.com/), [Socket.io](https://socket.io/) |
| Backend  |                        [Firebase](https://firebase.google.com/) Firestore, Firebase Storage (for images), Jitsi Meet SDKs                         |
| Database |                                                [Firebase](https://firebase.google.com/) Firestore                                                 |
| APIs     |                                                [Judge0](https://judge0.com/) for code interpreting                                                |

---

## Attribution
- [the icon "loading" is provided by loading.io](https://loading.io/icon/)
- Logo Inspiration by [DALLE](https://labs.openai.com) (Generated by [Project Maintainer](https://github.com/TheBrahmnicBoy) via custom prompt)
- Default Background by [DALLE](https://labs.openai.com) (Generated by [Project Maintainer](https://github.com/TheBrahmnicBoy) via custom prompt)

---

## Contributing

Thank you for your interest in contributing to this project! At this time, we are not accepting pull requests from external contributors. However, we appreciate your support and welcome any feedback or suggestions you may have. If you have any questions or concerns, please feel free to reach out to us below.

---

## Project Maintainers

| <a href="https://github.com/TheBrahmnicBoy"><img alt="Bhargav Modak" src="https://avatars.githubusercontent.com/u/82528318?v=4" width="130px;"><br><sub><b>Bhargav Modak</b></sub></a> | <a href="https://github.com/vishal-codes"><img alt="Vishal Shinde" src="https://avatars.githubusercontent.com/u/79784161" width="130px;"><br><sub><b>Vishal Shinde</b></sub></a> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                 <a href="mailto:thebrahmnicboy@gmail.com">E-Mail ↗️</a>                                                                 |                                                                 <a href="mailto:itsvishal2417.com">E-Mail ↗️</a>                                                                  |
|           [![Twitter](https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white&alt=twitter)](https://twitter.com/thebrahmnicboy)           |          [![Twitter](https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white&alt=twitter)](https://twitter.com/vishaltwts)          |