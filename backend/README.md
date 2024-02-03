# Alon's Spotify Clone Backend

## Project Overview
This project is a Spotify clone backend implemented in Node.js, utilizing MongoDB as the database and integrating with the Spotify API. The backend provides functionalities such as user authentication, track liking/unliking, playlist creation, song search, and category filtering.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing user and track data
- **Spotify API**: Integration for fetching and managing music data
- **JWT (JSON Web Tokens)**: Securely authenticate users and authorize requests
- **Bcrypt**: Hashing passwords for user security
- **Mongoose**: Elegant MongoDB object modeling for Node.js
- **Axios**: HTTP client for making requests to the Spotify API

## Getting Started
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure environment variables (e.g., Spotify API credentials, MongoDB connection string) in a `.env` file.
4. Run the application: `npm start`

## API Endpoints
- `/auth`: User authentication endpoints
- `/search`: Search-related operations
- `/playlists`: Playlist management (create, edit, delete)
