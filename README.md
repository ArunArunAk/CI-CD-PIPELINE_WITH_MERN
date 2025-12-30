<<<<<<< HEAD
# CI-CD-PIPELINE_WITH_MERN
=======
# CI/CD Pipeline with MERN Stack

This project is a simple student management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

The project is divided into two main folders:

- `backend`: Contains the Express.js server, which connects to a MongoDB database and provides a RESTful API for managing students.
- `frontend`: Contains the React application that consumes the backend API and provides a user interface for interacting with the student data.

## How to Run the Application

To run this application, you need to have Node.js and MongoDB installed on your machine.

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:5000`.

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be running on `http://localhost:5173` (or another port if 5173 is in use).

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/students`: Get all students.
- `POST /api/students`: Create a new student.
- `GET /api/students/:id`: Get a student by ID.
- `PUT /api/students/:id`: Update a student by ID.
- `DELETE /api/students/:id`: Delete a student by ID.
>>>>>>> 5916fe5 (Initial commit: MERN CI/CD pipeline with Docker, Nginx, GitHub Actions)
