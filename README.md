## Funky E-commerce Website
Welcome to the Funky E-commerce Website project! This project is aimed at creating a dynamic and user-friendly e-commerce platform where users can browse through a collection of funky products and make purchases.

### Features
User authentication and session management.
CRUD operations for products by administrators.
User-friendly interface for browsing and purchasing products.
Image upload functionality for product management.
Cart functionality for users to add and manage their selected items.

### Technologies Used
Node.js: A JavaScript runtime for building server-side applications.
Express.js: A web application framework for Node.js, providing features for web and mobile applications.
MongoDB: A NoSQL database for storing product and user information.
Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
Multer: Middleware for handling multipart/form-data, used for file uploads.
EJS: Embedded JavaScript templating for generating HTML with plain JavaScript.
Bootstrap: Front-end framework for designing responsive and mobile-first websites.

### Prerequisites
1.Node install:- https://nodejs.org/en/download
select Windows Installer.msi and follow the instruction to download node

2.Mongodb install:- https://www.mongodb.com/try/download/community
select Windows x64 in platform
select msi in packages and follow the instruction to download Mongodb

3.Vscode install:- https://code.visualstudio.com/download
select Windows and follow the instruction to download Vscode

### Installation

1.Clone the repository to your local machine:

    git clone https://github.com/yourusername/funky-ecommerce.git

2.Install dependencies:

    npm install

    
3.Set up environment variables:
  
   - Create a .env file in the root directory.
  
   - Add the following environment variables:

         PORT=5000

         DB_URI=mongodb://127.0.0.1:27017/myapp


4.Set Database in MongoDB Compass
Open Compass > select connect > create database name it myapp > create collection products
  
5.Start the server:

    npm start

### Usage
-Visit http://localhost:5000 in your web browser to access the website.
-As an admin, you can add, edit, and delete products by visiting the admin panel.
-Users can browse products, add them to the cart, and proceed to checkout.
-Ensure MongoDB is running locally or provide a MongoDB URI for database connectivity.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
