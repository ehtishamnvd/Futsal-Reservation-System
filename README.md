This is a full-stack web application designed for reserving futsal fields. It includes separate user roles for team captains, ground owners, and an academy registration system. The application features a chatbot powered by the Google Generative AI API to provide information on grounds, academies, and teams.

Features
Team and Ground Registration/Login: Users can register and log in as either a team or a ground owner. The system uses 

bcryptjs to hash passwords for secure authentication.


Profile Management: Users can manage their profiles, including uploading and deleting profile and cover photos. The 

firebase/storage library is used for this functionality.


Futsal Field Booking: The system allows teams to book specific time slots at various grounds. Ground owners can manage and update the availability of their time slots.


Ground Geolocation: New grounds are registered with a geographical location (latitude and longitude) using the LocationIQ API. This likely allows for searching grounds by location.


Academy Registration: A separate feature allows students to register for an academy.


Chatbot: A chatbot is integrated to provide information about ground availability for today, as well as details on registered academies and teams.

Technologies Used
Backend:


Node.js & Express: For the server-side logic and API routes.


MongoDB & Mongoose: As the database and object data modeling (ODM) library.


bcryptjs: For password hashing and security.


NodeGeocoder: To convert addresses into geographical coordinates (latitude and longitude).


Google Generative AI API: For the chatbot functionality.

Frontend:


React: For the user interface.


Redux Toolkit: For state management.


Firebase/Storage: For handling image uploads and deletion for user profiles.


Bootstrap: For styling and UI components.

Installation and Setup
Clone the repository.

Install dependencies: Navigate to the project root and run npm install.


Environment Variables: Create a .env file in the root directory and add the following keys:

Code snippet

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
LOCATIONIQ_API_KEY=YOUR_LOCATIONIQ_API_KEY
CONNECTION_URL=YOUR_MONGO_DB_CONNECTION_URL

Database: Ensure you have a MongoDB instance running and update CONNECTION_URL in your .env file.

Running the Application
Start the backend server by running npm start in the root directory. The server will run on port 5000 by default, or on a port specified by the 

PORT environment variable.

Start the frontend application by running npm start in the relevant frontend directory. It is configured to run on 

http://localhost:3000 or http://localhost:3001.

The API endpoints will be available at 

http://localhost:5000 (or your chosen port) for routes like /team, /ground, /academy, and /api/chatbot.
