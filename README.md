# CampusConnect Backend

Backend implementation for the **CampusConnect** project developed using the **PERN Stack** (PostgreSQL, Express.js, React.js, and Node.js).

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt
---

## Project Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── package.json
├── package-lock.json
```

---

## Prerequisites

Before running the project, make sure you have installed:

- Node.js (v18 or later)
- PostgreSQL
- pgAdmin (optional)

---

## Database Setup

### Step 1

Open PostgreSQL or pgAdmin.

### Step 2

Create a new database.

Example:

```
CampusConnect
```

### Step 3

Open the provided SQL file:

```
Database and Seed.sql
```

Execute the entire script.

The script will automatically:

- Create the CampusConnect schema
- Create all required tables
- Create foreign keys and constraints
- Create indexes
- Insert sample seed data

No additional database setup is required.

---

## Environment Variables

Create a file named:

```
.env
```

using the provided:

```
.env.example
```

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=CampusConnect
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
```

Update the values according to your PostgreSQL installation.

---

## Installing Dependencies

Inside the backend folder run:

```bash
npm install
```

---

## Running the Server

Start the development server:

```bash
npm run dev
```

or

```bash
npm start
```

If everything is configured correctly, the server should start on:

```
http://localhost:5000
```

---

## API Base URL

```
http://localhost:5000/api
```

---

## Implemented Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT |

---

### Communities

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/communities | Get all communities |
| POST | /api/communities/:id/join | Join a community |
| DELETE | /api/communities/:id/join | Leave a community |
| GET | /api/communities/:id/posts | Get community posts |
| POST | /api/communities/:id/posts | Create a new post |

---

### Posts

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/posts/:id | Get a post with comments |
| DELETE | /api/posts/:id | Delete a post |

---

### Comments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/posts/:id/comments | Add a comment |
| DELETE | /api/comments/:id | Delete a comment |

---

### User

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/users/me | Get logged-in user's profile |

---

### Recommendations

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/recommendations | Get personalized recommendations |

---

## Authentication

Protected routes require a JWT token.

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Community Membership
- Create and Delete Posts
- Add and Delete Comments
- User Profile
- Personalized Recommendations
- PostgreSQL Integration

---

## Database Tables

- Users
- Communities
- Memberships
- Posts
- Comments
- Interactions

---

---

## Authors
 Eyad Ebrahim:     Project Frontend setup, Login and registration pages, Mock Data(FrontEnd)
---------------------------------------------------------------------------------------------- 
 Mohamed Elassal:  Community Browsing and Community Page and Connected Frontend with BackEnd           using axios (FrontEnd)
---------------------------------------------------------------------------------------------- 
 Ahmed Waleed:     Create Post and delete post and display post author's name(FrontEnd)
----------------------------------------------------------------------------------------------
 Omar Hossam:      Add post detail view and display post comments(FrontEnd)
----------------------------------------------------------------------------------------------
 Ahmed Hamed:      Add/delete your own comment and Recommendations Page(FrontEnd)
----------------------------------------------------------------------------------------------
 Omar Raghed:      Devoloped the Interaction system(FrontEnd).
----------------------------------------------------------------------------------------------
 Basel:            setting up the backend with Express, registration, Login(user
                   authentication   with JWT) and community API Endpoints (BackEnd).
----------------------------------------------------------------------------------------------
Abdelrahman Ahmed: Backend Endpoints: posts comments, profile and recommendation, 
                   and developed the interaction function.(BackEnd)









