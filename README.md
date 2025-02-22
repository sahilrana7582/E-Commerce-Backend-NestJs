# E-Commerce Backend

## Overview
This is an e-commerce backend application built with NestJS and TypeORM, designed to handle user management, product management, order processing, and shopping cart functionalities.

## Features

### User Management
- **User Registration**: Users can register with their name, email, password, and role.
- **User Authentication**: JWT-based authentication for secure access.
- **User Profile**: Users can create and manage their profiles, including uploading avatars.

### Product Management
- **Product Creation**: Admins can add new products with details like name, price, description, stock, category, and brand.
- **Product Update**: Admins can update existing product details.
- **Product Deletion**: Admins can delete products from the inventory.
- **Product Listing**: Users can view all available products.

### Order Processing
- **Order Creation**: Users can create orders by selecting products from their cart.
- **Order Retrieval**: Users can view their past orders.
- **Order Deletion**: Users can delete their orders if needed.

### Shopping Cart
- **Add to Cart**: Users can add products to their shopping cart.
- **View Cart**: Users can view all items in their cart, including total price and quantity.
- **Update Cart**: Users can update the quantity of items in their cart.
- **Remove from Cart**: Users can remove items from their cart.

### Address Management
- **Address Creation**: Users can add addresses to their profiles.
- **Address Retrieval**: Users can view their saved addresses.

### Cloud Storage
- **Image Upload**: Users can upload images (e.g., avatars) to Cloudinary for storage.

## Technologies Used
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5) that supports many SQL-based databases.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Cloudinary**: A cloud-based service for managing images and videos.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-commerce-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables in a `.env` file (refer to `.env.example` for structure).
5. Run the application:
   ```bash
   npm run start:dev
   ```

## API Documentation
Refer to the API documentation for detailed information on endpoints, request/response formats, and authentication.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.