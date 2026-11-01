# AppointEase – Appointment Booking System

![Project](https://img.shields.io/badge/Project-AppointEase-blue)
![Frontend](https://img.shields.io/badge/Frontend-React.js-61DAFB)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## 1. Project Overview

AppointEase is a web-based Appointment Booking System developed to make appointment scheduling and management easier. It provides users with a simple and responsive platform where they can register, log in, create appointments, and manage their bookings.

The system allows authenticated users to organize their appointments, track their status, and manage their schedules through a user-friendly dashboard.

## 2. Project Objectives

The main objectives of AppointEase are:

- To provide an easy online appointment booking system.
- To reduce manual appointment management.
- To allow users to manage their appointments from one dashboard.
- To provide secure user authentication.
- To store appointment information permanently in a database.
- To provide a responsive and user-friendly interface.

## 3. Main Features

### User Authentication
- User registration.
- Secure user login and logout.
- Password hashing using bcryptjs.
- JWT-based authentication.
- Protected application routes.

### Appointment Management
- Create new appointments.
- View appointment details.
- Edit existing appointments.
- Delete appointments.
- Update appointment status.
- Validate appointment dates and times.
- Prevent end times from being earlier than or equal to start times.

### Dashboard
- Display total appointments.
- Show pending appointments.
- Show confirmed appointments.
- Show cancelled appointments.
- Show completed appointments.
- Display recent appointments.
- Search appointments by title.
- Filter appointments by status.

### User Interface
- Clean and modern design.
- Responsive layout.
- Easy navigation.
- Form validation.
- User-friendly notifications.

## 4. Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| React.js | Building the user interface |
| Vite | Frontend development environment |
| CSS | Styling and responsive design |
| Axios | API communication |
| React Router | Application navigation |
| Lucide React | Icons |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend API development |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | User authentication |
| bcryptjs | Password hashing |

## 5. Project Architecture

AppointEase follows a client-server architecture.

- **Frontend:** Handles the user interface and user interactions.
- **Backend:** Handles authentication, appointment operations, and business logic.
- **Database:** Stores user accounts and appointment records.

## 6. Project Folder Structure

```text
AppointEase/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## 7. Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB Atlas account
- Visual Studio Code

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Install Frontend Dependencies

```bash
cd AppointEase/client
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd ../server
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the example values with your own private configuration. Never upload your `.env` file to GitHub.

### Step 5: Start the Backend

Inside the `server` directory, run:

```bash
npm run dev
```

### Step 6: Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 8. API Overview

The backend provides REST API endpoints for authentication and appointment management.

### Authentication Routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in a user |

### Appointment Routes

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/appointments` | Create an appointment |
| GET | `/api/appointments` | Get user appointments |
| PUT | `/api/appointments/:id` | Update an appointment |
| DELETE | `/api/appointments/:id` | Delete an appointment |

Appointment routes require a valid authentication token.

## 9. Database Design

AppointEase uses MongoDB with two main collections:

### User Collection
Stores user account information, including:
- User name
- Email
- Hashed password

### Appointment Collection
Stores appointment information, including:
- User reference
- Appointment title
- Description
- Date
- Start time
- End time
- Status
- Creation and update timestamps

## 10. Security

The project includes several security measures:

- Password hashing with bcryptjs.
- JWT-based authentication.
- Protected API routes.
- User-specific appointment access.
- Server-side validation.
- Environment variables for sensitive configuration.

## 11. Testing

The following application functions have been tested:

- User registration and login.
- Appointment creation.
- Appointment listing.
- Appointment editing.
- Appointment deletion.
- Appointment status updates.
- Search and filtering.
- Dashboard statistics.
- Data persistence.
- Invalid appointment time validation.
- Responsive interface.

## 12. Future Improvements

Possible future improvements include:

- Email appointment reminders.
- Calendar integration.
- Admin dashboard.
- Appointment notifications.
- Online appointment availability.

## 13. Conclusion

AppointEase provides a simple and effective solution for managing appointments online. It combines a React frontend, Node.js and Express backend, and MongoDB database to provide authentication, appointment management, and dashboard functionality.

The project demonstrates practical implementation of full-stack web development concepts, REST APIs, database operations, and secure authentication.

## 14. Developer Information

**Developer:** Abubakar Siddique

**Organization:** Devixo Solutions

**Task:** Task 04

**Project Name:** AppointEase – Appointment Booking System

**Domain:** Full Stack Web Development

