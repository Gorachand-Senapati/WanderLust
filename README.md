# 🏡 WanderLust - Airbnb Clone  

A full-stack Airbnb-inspired web application where users can discover, list, and book unique stays worldwide.

---

## ✨ Features  
- **User Authentication**: Signup, login, and logout with secure password hashing  
- **CRUD Listings**: Create, read, update, and delete property listings  
- **Interactive Map**: Powered by **Mapbox** to visualize property locations  
- **Image Uploads**: Store listing images securely using **Cloudinary**  
- **Search & Filters**: Filter by location, price range, and amenities  
- **Reviews & Ratings**: Users can leave reviews and ratings for listings  
- **Responsive UI**: Built with **Bootstrap** for seamless mobile/desktop experience  

---

## 🛠 Tech Stack  
### **Frontend**  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)  
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)  
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)  

### **Backend**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)  

### **Database & APIs**  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)  
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)  
![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=flat&logo=mapbox&logoColor=white)  

---

## 🚀 Installation  
1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
2. Install dependencies
   ```sh
   npm install
## 🔧 Environment Setup

 **Create a `.env` file** in your project root directory
**Add these variables** with your actual credentials:
# .env.example
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=pk.your_mapbox_token
SESSION_SECRET=your_random_session_secret
```
4. Run the server
   ```
   nodemon app.js
   Visit http://localhost:8080.
   ```
   🤝 Contributing
Fork the project
```
Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request
