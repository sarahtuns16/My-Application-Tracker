🌎Project Overview

MyApplicationTrackr is a backend system designed to help users organize, track, and manage their job or internship applications in a structured way.

The platform allows users to create accounts, record job applications, monitor application status, and receive reminders for follow-ups. The goal of this Minimum Viable Product (MVP) is to build a secure and reliable backend API that supports authentication, application tracking, dashboard statistics, and automated reminders.

The project is being developed collaboratively by the backend developers in Group 10, with each developer responsible for a specific module.

☑️Core Modules

Module                   |        Purpose
-------------------------------------------------------------------
Database & Configuration | Manages database connection and models

User Authentication      | Manages registration, login, and security

Application Management	 | Handles CRUD operations for job applications

Dashboard Metrics        | Provides application statistics

Follow-up Reminder       | Sends automated reminders
Validation & 

Error Handling           | Ensures API reliability and security

☑️Team Split 

Group 10 Backend Development Responsibilities

To ensure effective collaboration, the backend development work is divided into modules.

☑️Developer 1 – Project Setup and Database Configuration

Responsibilities:

	•	Initialize the Node.js project
	•	Configure the Express server
	•	Install project dependencies
	•	Configure environment variables
	•	Connect the application to the database
	•	Create the project folder structure

⸻

☑️Developer 2 – User Authentication

Responsibilities:

	•	Create the User model
	
	•	Implement user registration
POST /api/auth/register

	•	Implement user login
POST /api/auth/login

	•	Hash passwords using bcrypt
	•	Generate JWT tokens
	•	Create authentication middleware

⸻

☑️Developer 3 – Application Management (CRUD)

Responsibilities:

	•	Create the Application model
	
	•	Implement endpoints to create applications
POST /api/applications

	•	Retrieve user applications
GET /api/applications

	•	Update application details
PUT /api/applications/:id

	•	Delete applications
DELETE /api/applications/:id

	•	Ensure applications belong to the authenticated user

⸻

☑️Developer 4 – Dashboard Metrics API

Responsibilities:

	•	Query user applications
GET /api/dashboard/summary

	•	Calculate total applications
	•	Group applications by status
	•	Return recent applications

⸻

☑️Developer 5 – Follow-up Reminder System

Responsibilities:

	•	Implement scheduled jobs using node-cron
	•	Run daily background tasks
	•	Check applications with followUpDate
	•	Trigger reminder notifications

⸻

☑️Developer 6 – API Validation and Error Handling

Responsibilities:

	•	Validate incoming request data
	•	Implement global error handling middleware
	•	Handle authentication and authorization errors
	•	Ensure consistent API responses
	•	Implement pagination for application lists

### Applications Endpoints

| Action | Method | Endpoint | Description |
|-------|--------|---------|-------------|
| Create Application | POST | /api/applications | Create a new job/internship application |
| Get All Applications | GET | /api/applications | Retrieve all applications for the authenticated user |
| Get Single Application | GET | /api/applications/:id | Retrieve a specific application by ID |
| Update Application | PUT / PATCH | /api/applications/:id | Update an existing application |
| Delete Application | DELETE | /api/applications/:id | Delete an application |

**Note:** All endpoints require a valid JWT token for authentication.

☑️ Database Architecture

The system uses two primary data models: User and Application.

☑️User Model

Field                  |Type	                  | Description
------------------------------------------------------------------
id	                   | Primary Key              | Unique identifier

name	               |  String                  | User’s full name

email 	               |  String                  | Unique email address

passwordHash           |  String                  | Hashed password

createdAt	           |  Timestamp               |	Account creation time

☑️Application Model

Field                  | Type	                          | Description
----------------------------------------------------------------------------
id                    | Primary Key	                      | Unique identifier

userId                | Foreign Key 	                  | Linked to User

companyName           | String      	                  | Company applied to

jobTitle              | String      	                  | Position applied for
status	              | Enum            	              | Applied, Interviewing, Offered, Rejected
dateApplied	          | Date                           	  | Date application was submitted
followUpDate          | Date (Optional) 	              | Reminder date
notes	              | Text (Optional)	                  | Additional notes

createdAt	          | Timestamp                         | Record creation time
updatedAt             | Timestamp	                      | Last update time

☑️Permission Matrix

For the MVP, the system contains a single primary role: Authenticated User.

Action                         | Guest (Not Logged In)                  | Authenticated User
------------------------------------------------------------------------------

Register Account               | Allowed                 	            | Not Applicable

Login           	           | Allowed                 	            | Allowed

Create Application	           | Not Allowed             	            | Allowed

View Applications	           | Not Allowed	                        | Allowed

Update Application         	   | Not Allowed              	            | Allowed (only their own applications)

Delete Application	           | Not Allowed             	            | Allowed (only their own applications)

View Dashboard
Metrics           	           | Not Allowed             	            | Allowed

Receive Follow-up   
Reminders	                   | Not Allowed             	            | Allowed

☑️••PROJECT FOLDER STRUCTURE 

myapplication-trackr/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── applicationController.js
│   └── dashboardController.js
│
├── models/
│   ├── User.js
│   └── Application.js
│
├── routes/
│   ├── authRoutes.js
│   ├── applicationRoutes.js
│   └── dashboardRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
│
├── services/
│   └── reminderService.js
│
├── cron/
│   └── reminderJob.js
│
├── utils/
│   └── helpers.js
│
├── seeders/
│   └── seedContent.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

☑️Future Enhancements

Planned improvements beyond the MVP include:

	•	Job recommendation system
	•	Advanced analytics dashboards
	•	Application success rate tracking
	•	Historical job search insights

License: 
This project was developed as part of a Capstone Backend Development program for educational purposes.
