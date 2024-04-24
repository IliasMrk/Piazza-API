# Piazza-API

Piazza-API is a RESTful API developed using Node.js, Express, and MongoDB. 
It is designed to provide a backend for managing educational content similar to the Piazza platform, which is popular among students and educators for classroom interaction.

## Features

- **User Management:** Handles user registration, authentication, and profile management.
- **Post Interactions:** Allows users to create, read, update, and delete educational posts.
- **Real-Time Updates:** Supports real-time updates to ensure all users see the most current data.
- **Data Validation:** Implements robust validation mechanisms to maintain data integrity.

## Technology Stack

- **Node.js:** For running JavaScript on the server.
- **Express:** Web application framework for Node.js, simplifying the server creation process.
- **MongoDB:** A NoSQL database used to store application data.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js for managing relationships between data and translating between objects in code and their representation in MongoDB.

## Project Structure

- **/models:** Contains the data models for the application, defining the schema for MongoDB.
- **/routes:** Manages all the API routes, directing HTTP requests to the correct logic.
- **/validations:** Ensures all incoming data meets the application's requirements before processing.

## API Usage

The API supports several endpoints for managing users and posts. These can be accessed via HTTP methods like GET, POST, PUT, and DELETE to perform operations corresponding to fetching, creating, updating, and removing data.
