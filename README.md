# FlyTicket ✈️ – Airline Reservation System

This is a full-stack web application developed as a final project for the Dynamic Web Programming course. The project allows users to search and book airline tickets, and enables administrators to manage flight data through a protected admin panel.

---

## 🚀 Technologies Used

- **Frontend:** React.js, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose

---

## 📦 Folder Structure

```
flyticket/
├── backend/        # Express backend with MongoDB
└── frontend/       # React frontend with routing and forms
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd flyticket
```

---

### 2. Start Backend

```bash
cd backend
npm install
npm start
```

Make sure MongoDB is running locally.  
Create a `.env` file in the backend folder and add:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/flyticket
```

---

### 3. Start Frontend

```bash
cd ../frontend
npm install
npm start
```

React will open at: [http://localhost:3001](http://localhost:3001) (or next available port).

---

## 👨‍✈️ Admin Credentials

If an admin account does not exist, you can register one using Postman:

```http
POST http://localhost:3000/admin/register
```

Request Body (JSON):
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Then, go to: [http://localhost:3001/admin](http://localhost:3001/admin)

---

## 🧩 Features

### 🧍‍♂️ User Side

- View all available flights
- Search flights by departure city, destination, and date
- Book tickets with name, surname, and email
- Booking success confirmation page

### 🧑‍💼 Admin Side

- Admin login system
- Add new flights
- Edit existing flights
- Delete flights
- Protected admin panel access
- Logout option

---

## 🔐 Backend Validations

- A city cannot have two departing flights at the same hour
- A city cannot have two arriving flights at the same time
- All validations are handled server-side

---

## 📄 API Endpoints Summary

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | /cities                | Get list of all cities          |
| POST   | /cities/bulk           | Insert list of 81 Turkish cities|
| GET    | /flights               | Get all flights                 |
| POST   | /flights               | Add new flight (admin only)     |
| PUT    | /flights/:id           | Update flight (admin only)      |
| DELETE | /flights/:id           | Delete flight (admin only)      |
| POST   | /tickets               | Book a ticket                   |
| GET    | /tickets/:email        | Get all tickets by email        |
| POST   | /admin/login           | Admin login                     |

---

## 🎯 Project Goals Achieved

✅ Full admin CRUD operations  
✅ User-side flight search and reservation  
✅ Reservation confirmation screen  
✅ Backend rule enforcement  
✅ Protected admin panel with login control  
✅ 81 cities imported and used in dropdowns

---

## 📝 Developer Notes

- Optional features like seat selection, e-ticket by email, or payment simulation are not implemented.
- Styling is basic but responsive. Can be extended using CSS frameworks (e.g., Bootstrap or TailwindCSS).

---

## 📚 License

This project is developed for academic purposes only.

© 2025 – FlyTicket Project
