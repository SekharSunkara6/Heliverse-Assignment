
# full-stack classroom website.

A complete classroom management web app for principals, teachers, and students to smoothly handle classroom tasks.


### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/SekharSunkara6/Heliverse-Assignment.git
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
  1) **Email:** principal@classroom.com
  2) **Password:** Admin
- Teachers and students can be added by the principal.
