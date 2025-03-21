# Instructions on How to Run the Application

## 1. Set Up PostgreSQL Database

### Install and Run PostgreSQL
1. Download and install PostgreSQL.
2. Start the PostgreSQL service.
3. Create Database and User

## 2. Configure Application Properties

### Prepare Configuration Files
1. Rename the provided `sample_application.properties` file to `application.properties`.
2. Place `application.properties` in the `src/main/resources` directory of your project.
3. Set database connection and other required properties inside the `application.properties` file.

## 3. Run the Application

### Using an IDE
1. Open your preferred IDE (e.g., IntelliJ IDEA, Eclipse).
2. Import the Spring Boot project.
3. Run the main method of your Spring Boot application thats located in `src/main/java/com/cryptotrading/CryptoApplication.java`.

### Using Command Line
1. Open a terminal in the root directory of your project.
2. Ensure that the environment variables from the `.env` file are loaded.
3. Build and run the application using Maven or Gradle.

Your application should now be running on `localhost:8080` and connected to the PostgreSQL database!
