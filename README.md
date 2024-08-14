
# Classroom Management System

A full-stack classroom management web application that allows principals, teachers, and students to manage classroom activities seamlessly. The project was developed as part of a Full Stack Development Screening Assignment.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [License](#license)

## Features

### Principal
- Create and manage classrooms.
- Create accounts for teachers and students.
- Assign teachers to classrooms.
- Assign students to teachers.
- View and edit the list of teachers and students.

### Teacher
- Manage students assigned to their classroom.
- View the lists their classrooms and students.

### Student
- View their assigned classroom.
- View other students in their classroom.

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB

### Deployment
- Frontend: Vercel
- Backend: Render

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB database setup

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/abhimanyu0018/classroom.git
    cd classroom/server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    Create a \`.env\` file in the \`backend\` directory and add your MongoDB connection string and other necessary environment variables.
    ```bash
    MONGO_URI=your_mongo_connection_string
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

## Usage

- Principal can log in with the default credentials:
  - **Email:** principal@classroom.com
  - **Password:** Admin
- Teachers and students can be added by the principal.

## Live Demo

Check out the live version of the app [here](https://classroom-fawn.vercel.app).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
