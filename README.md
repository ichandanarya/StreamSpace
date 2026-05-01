<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# StreamSpace - YouTube Clone


A feature-rich YouTube clone built using the MERN stack, JWT for authentication, and Firebase Storage for video and file storage. This project aims to replicate the core functionalities of YouTube, allowing users to upload, view, like, comment, and interact with videos.


## Features

- User Authentication using JWT.
- User Registration and Login.
- Uploading and viewing videos.
- Create a channel and upload content.
- Like, comment, save, and share videos.
- Create playlists and share them with others.
- Video storage using Firebase Storage.
- YouTube studio to manage channel and content.
- Responsive design for mobile and desktop.
- And much more...

## Technologies Used

- **M**ongoDB: Database for storing user data and video metadata.
- **E**xpress.js: Server framework for handling API requests.
- **R**eact.js: Frontend library for building the user interface.
- **N**ode.js: JavaScript runtime for the server.
- **Firebase Storage**: Cloud storage for video uploads.
- **JSON Web Tokens (JWT)**: For user authentication.
- **React Icons & MUI**: For icons.


## Configuration
1. Create a `.env` file in the root directory of your project.
2. Add necessary environment variables to the `.env` file, such as database connection URLs, API keys, or other sensitive data.
3. Add your own MongoDB Atlas URI in the datbase file inside the backend folder.

```bash
SECRET_KEY=your-secret-key
EMAIL=email-to-use-as-nodemailer-service
PASSWORD=google-app-password
```

## Running the Application
### Server
Install server dependencies:

``npm install``

Start the server:

``npm start``


### Client
Install client dependencies:

``npm install``

Start the client application:

``npm run dev``

Open your web browser and visit `http://localhost:5173` to access the application.
>>>>>>> origin/main
