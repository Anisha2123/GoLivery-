# 🚖 Ride-Hailing & Delivery Backend API

## 📌 Overview  
This is a backend system for a ride-hailing and delivery service, built with Node.js, Express, MongoDB, and JWT authentication. It provides APIs for user registration, login, cab listing, order creation, and tracking with secure authentication and input validation.

## 🔹 Tech Stack:  
Backend: Node.js, Express.js  
Database: MongoDB
Authentication: JWT (JSON Web Token)  
Validation: Joi  
Testing: Jest, Supertest  
Hosting: Render (Backend), MongoDB Atlas (Database)  

## 🚀 Features  
✔️ User Registration & Login with JWT Authentication  
✔️ Secure Role-Based Access (Admin/User)  
✔️ Cab Listing API with Filtering  
✔️ Order Creation & Tracking APIs  
✔️ Validation & Error Handling for Robust API Requests  
✔️ Automated API Testing for Cab Listing  

## 🔧 Installation & Setup

1️⃣ Clone the Repository

    git clone https://github.com/yourusername/ride-hailing-backend.git
    cd ride-hailing-backend

2️⃣ Install Dependencies

     npm install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add the following:
 
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    
4️⃣ Start the Server
           
    npm run dev
    Server will run at http://localhost:5000  

## 🛠️ API Endpoints  

### 1️⃣ User Authentication  

|    Method     | Endpoint           | Description  |  Access |
| ------------- |:-------------:| -----:| -----: |
| POST      | /api/users/register| Register a new user| Public |
| POST      |	/api/users/login |   	Login & get JWT token	 | PUBLIC |  

User Registration (/api/users/register)  
![image](https://github.com/user-attachments/assets/772bb29d-2cf2-404d-85a8-ab1f84e6b615)

Request:  

    {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
    }
Response:   

    {
    "message": "User registered successfully",
     "token": "jwt_token_here"
    }
User Login (/api/users/login)  
![image](https://github.com/user-attachments/assets/ed12e6a0-536f-43e7-bb8d-db7fd70a80b6)

Request:  

    {
    "email": "john@example.com",
    "password": "securepassword"
    }
Response:   

    {
     "token": "jwt_token_here"
    }

### 2️⃣ Cab Listing
|    Method     | Endpoint    | Description       | Access  |
| ------------- |:-------------:| -----:|-----: |
| 	Get     | 	/api/cabs/list| 	Get all available cabs| Public |
| 	POST     | 	/api/cabs/add| 	Add new cabs| Public |

Listing Cabs
Response:   

    [
    {
    "_id": "cab_id_123",
    "name": "Toyota Camry",
    "type": "Sedan",
    "capacity": 4,
    "farePerKm": 12
    }
    ]


### 3️⃣ Order Management  

|    Method     | Endpoint           | Access  |
| ------------- |:-------------:| -----:|
| POST      | /api/orders/create| Place a new order	 | Authenticated |
| GET      | /api/orders/:id	     |   Track order status	 | Authenticatedn |

Order Creation Request:    
Request:  

    {
    "cabId": "cab_id_123",
    "pickupLocation": "Street 1",
    "dropoffLocation": "Street 2"
    }
Response:   

    {
    "message": "Order placed successfully",
    "orderId": "order_id_456"
    }
    
 ## 🔐 Authentication & Security  
JWT Authentication: Required for protected routes  
Input Validation: Using Joi for request validation  
Role-Based Access: Admin vs. User access control  

## 📡 Deployment  
🔹 Backend Hosted on Render: https://golivery.onrender.com/  
🔹 GitHub Repository: GitHub [Link](https://github.com/Anisha2123/GoLivery-)

## 💡 Best Practices Followed  
✔️ Modular Code Structure  
✔️ Proper HTTP Status Codes & Error Messages  
✔️ Secure Authentication with JWT  
✔️ Edge Case Handling in Test Cases  

## 📩 Contact  
🔹 Developer: Anisha Birla  
🔹 Email: birlaani@gmail.com  
🔹 LinkedIn: https://www.linkedin.com/in/anishabirla/

## ⭐ If you found this useful, don’t forget to star the repository! 🚀✨
