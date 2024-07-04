## Installing and Running Locally

To run the Next App locally on your machine, follow these steps:
### Prerequisites
Ensure you have the following installed on your system:
- Node.js (version 14 or higher)
- npm (Node Package Manager) or yarn

### Installation Steps

1. **Clone the repository:**

   ```
   git clone https://github.com/Neel0767/task-managment-client.git
   ```

2. **Navigate into the project directory:**

   ```
   cd task-management-client
   ```

3. **Install dependencies:**

   Using npm:

   ```
   npm install
   ```

   or using yarn:

   ```
   yarn install
   ```

### Running the App

Before running the app, make sure to add environment variables in `.env` file
```.env
NEXT_PUBLIC_API_URL=http://localhost:8080/
```

**Development mode:**

  ```
  npm run dev
  ```

  This command starts the Next.js development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Additional Notes

- For production deployment, refer to the deployment instructions in the README or documentation.
