# Alon's Spotify Clone

## Project Overview
This project is a full-fledged Spotify clone, featuring both the frontend and backend components. The frontend is built using React and leverages technologies such as Radix UI for components, Emotion for styling, and Axios for handling HTTP requests. Firebase is used for image storage. On the backend, Node.js powers the server, Express.js is the web application framework, and MongoDB serves as the database. The backend integrates with the Spotify API to provide functionalities like user authentication, track liking/unliking, playlist creation, song search, and category filtering.

## Technologies Used
- **Frontend:**
  - React
  - Radix UI
  - Redux
  - Emotion
  - Axios
  - Firebase

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Spotify API
  - JWT (JSON Web Tokens)
  - Bcrypt
  - Mongoose
  - Axios

## Getting Started
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure environment variables:
   - For frontend: Check `.env` or relevant configuration files in `/src/firebase`
   - For backend: Create a `.env` file with Spotify API credentials, MongoDB connection string, and any other necessary variables.
4. Run the application:
   - Frontend: `npm start`
   - Backend: `npm start` or as per backend setup instructions

## Project Structure
- `/src`: Source code directory for the frontend
  - `/components`: React components
  - `/styles`: Emotion styling files
  - `/redux`: Redux store and slices
  - `/guards`: Guarded routing components
  - `/services`: Axios service for API requests
  - `/firebase`: Firebase configuration and storage-related code

- `/backend`: Source code directory for the backend
  - `/auth`: User authentication endpoints
  - `/search`: Search-related operations
  - `/playlists`: Playlist management (create, edit, delete)

## Usage
Explore and interact with the Spotify clone app. Enjoy features like liking/unliking tracks, creating playlists, searching for songs, and filtering by categories.

Feel free to contribute, report issues, or suggest improvements!

Happy listening!
